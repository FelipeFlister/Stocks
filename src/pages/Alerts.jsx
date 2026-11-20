import React, { useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { differenceInDays, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, PackageX, Clock, TrendingDown, CheckCheck, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const TYPES = {
  out: { label: "Esgotado", icon: PackageX, badge: "bg-red-100 text-red-700", priority: 1 },
  low: { label: "Estoque Baixo", icon: TrendingDown, badge: "bg-amber-100 text-amber-700", priority: 2 },
  expiring: { label: "Vencimento Próximo", icon: Clock, badge: "bg-orange-100 text-orange-700", priority: 3 },
  slow: { label: "Produto Parado", icon: AlertTriangle, badge: "bg-blue-100 text-blue-700", priority: 4 },
};

export default function Alerts() {
  const [filterType, setFilterType] = useState("all");
  const [dismissed, setDismissed] = useState(new Set());
  const { data: currentUser } = useCurrentUser();
  const uid = currentUser?.id;

  const { data: products = [] } = useQuery({
    queryKey: ["products", uid],
    queryFn: () => base44.entities.Product.filter({ created_by_id: uid }, "-created_date", 500),
    enabled: !!uid,
  });

  const alerts = useMemo(() => {
    const list = [];
    const now = new Date();

    products.forEach((p) => {
      if ((p.quantity || 0) <= 0) {
        list.push({ id: `out-${p.id}`, type: "out", product: p, message: "Produto sem estoque disponível." });
      } else if ((p.quantity || 0) < (p.min_quantity || 0)) {
        const diff = (p.min_quantity || 0) - (p.quantity || 0);
        list.push({ id: `low-${p.id}`, type: "low", product: p, message: `Faltam ${diff} unidade(s) para atingir o mínimo de ${p.min_quantity}.` });
      }

      if (p.expiration_date) {
        const days = differenceInDays(parseISO(p.expiration_date), now);
        if (days <= 30 && days >= 0) {
          list.push({ id: `exp-${p.id}`, type: "expiring", product: p, message: `Vence em ${days === 0 ? "hoje" : `${days} dia(s)`}.` });
        }
      }

      if (p.last_movement_date) {
        const daysIdle = differenceInDays(now, parseISO(p.last_movement_date));
        if (daysIdle >= 30 && (p.quantity || 0) > 0) {
          list.push({ id: `slow-${p.id}`, type: "slow", product: p, message: `Sem movimentação há ${daysIdle} dias.` });
        }
      }
    });

    return list.sort((a, b) => TYPES[a.type].priority - TYPES[b.type].priority);
  }, [products]);

  const filtered = alerts.filter((a) => {
    if (dismissed.has(a.id)) return false;
    if (filterType !== "all" && a.type !== filterType) return false;
    return true;
  });

  const counts = useMemo(() => {
    const c = { out: 0, low: 0, expiring: 0, slow: 0 };
    alerts.filter((a) => !dismissed.has(a.id)).forEach((a) => c[a.type]++);
    return c;
  }, [alerts, dismissed]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Central de Alertas</h1>
        <p className="text-muted-foreground text-sm">Visão consolidada de todos os alertas do estoque</p>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(TYPES).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setFilterType(filterType === key ? "all" : key)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all
              ${filterType === key ? "ring-2 ring-primary" : ""}
              ${cfg.badge} border-transparent`}
          >
            <cfg.icon className="w-4 h-4" />
            {cfg.label}
            <span className="ml-1 bg-white/60 rounded-full px-1.5 py-0.5 text-xs font-bold">{counts[key]}</span>
          </button>
        ))}
        <div className="ml-auto">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-44 text-sm">
              <SelectValue placeholder="Filtrar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {Object.entries(TYPES).map(([k, cfg]) => (
                <SelectItem key={k} value={k}>{cfg.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
            <CheckCheck className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Tudo em ordem!</h3>
          <p className="text-sm text-muted-foreground">Nenhum alerta ativo no momento.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((alert) => {
            const cfg = TYPES[alert.type];
            return (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:shadow-sm transition-shadow"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cfg.badge}`}>
                  <cfg.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">{alert.product.name}</p>
                    <Badge className={`text-xs ${cfg.badge} border-none`}>{cfg.label}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{alert.message}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link to="/products">
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="Ver produto">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    title="Dispensar"
                    onClick={() => setDismissed((d) => new Set([...d, alert.id]))}
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}