import React, { useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { differenceInDays, parseISO, format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import StatCard from "@/components/shared/StatCard";
import { DollarSign, TrendingUp, Package, ShoppingCart } from "lucide-react";

const COLORS = ["#1e3a5f", "#f59e0b", "#10b981", "#ef4444", "#6366f1", "#ec4899", "#14b8a6", "#8b5cf6"];

export default function Reports() {
  const { data: currentUser } = useCurrentUser();
  const uid = currentUser?.id;

  const { data: products = [] } = useQuery({
    queryKey: ["products", uid],
    queryFn: () => base44.entities.Product.filter({ created_by_id: uid }, "-created_date", 500),
    enabled: !!uid,
  });

  const { data: movements = [] } = useQuery({
    queryKey: ["movements-all", uid],
    queryFn: () => base44.entities.StockMovement.filter({ created_by_id: uid }, "-created_date", 500),
    enabled: !!uid,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories", uid],
    queryFn: () => base44.entities.Category.filter({ created_by_id: uid }),
    enabled: !!uid,
  });

  const stats = useMemo(() => {
    const totalCapital = products.reduce((s, p) => s + (p.quantity || 0) * (p.cost_price || 0), 0);
    const potentialRevenue = products.reduce((s, p) => s + (p.quantity || 0) * (p.sell_price || 0), 0);
    const profit = potentialRevenue - totalCapital;

    const last30 = movements.filter(m => {
      const d = differenceInDays(new Date(), parseISO(m.created_date));
      return d <= 30;
    });
    const entries30 = last30.filter(m => m.type === "entrada");
    const exits30 = last30.filter(m => m.type === "saida");
    const totalEntryValue = entries30.reduce((s, m) => s + (m.total_value || 0), 0);
    const totalExitValue = exits30.reduce((s, m) => s + (m.total_value || 0), 0);

    return { totalCapital, potentialRevenue, profit, totalEntryValue, totalExitValue, entries30: entries30.length, exits30: exits30.length };
  }, [products, movements]);

  const topProducts = useMemo(() => {
    const map = {};
    movements.filter(m => m.type === "saida").forEach(m => {
      map[m.product_name] = (map[m.product_name] || 0) + m.quantity;
    });
    return Object.entries(map)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6)
      .map(([name, qty]) => ({ name: name.length > 15 ? name.slice(0, 15) + "…" : name, vendas: qty }));
  }, [movements]);

  const categoryDistribution = useMemo(() => {
    const catMap = {};
    categories.forEach(c => { catMap[c.id] = c.name; });
    const dist = {};
    products.forEach(p => {
      const catName = catMap[p.category_id] || "Sem categoria";
      dist[catName] = (dist[catName] || 0) + (p.quantity || 0) * (p.cost_price || 0);
    });
    return Object.entries(dist)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }));
  }, [products, categories]);

  const dailyMovements = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, "yyyy-MM-dd");
      const dayLabel = format(date, "EEE", { locale: ptBR });
      const dayEntries = movements.filter(m => m.type === "entrada" && m.created_date?.startsWith(dateStr));
      const dayExits = movements.filter(m => m.type === "saida" && m.created_date?.startsWith(dateStr));
      days.push({
        name: dayLabel,
        entradas: dayEntries.reduce((s, m) => s + (m.total_value || 0), 0),
        saidas: dayExits.reduce((s, m) => s + (m.total_value || 0), 0),
      });
    }
    return days;
  }, [movements]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground text-sm">Visão financeira do seu estoque</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Capital em Estoque"
          value={`R$ ${stats.totalCapital.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          icon={DollarSign}
          iconColor="bg-blue-50"
        />
        <StatCard
          title="Receita Potencial"
          value={`R$ ${stats.potentialRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          icon={TrendingUp}
          iconColor="bg-emerald-50"
        />
        <StatCard
          title="Entradas (30 dias)"
          value={`R$ ${stats.totalEntryValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          subtitle={`${stats.entries30} movimentações`}
          icon={Package}
          iconColor="bg-amber-50"
        />
        <StatCard
          title="Saídas (30 dias)"
          value={`R$ ${stats.totalExitValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          subtitle={`${stats.exits30} movimentações`}
          icon={ShoppingCart}
          iconColor="bg-purple-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily movements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Últimos 7 Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyMovements} barGap={4}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={v => `R$${v >= 1000 ? (v/1000).toFixed(0)+'k' : v}`} />
                <Tooltip formatter={(value) => [`R$ ${value.toFixed(2)}`]} contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="entradas" fill="#10b981" radius={[6, 6, 0, 0]} name="Entradas" />
                <Bar dataKey="saidas" fill="#ef4444" radius={[6, 6, 0, 0]} name="Saídas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Capital por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={2}>
                    {categoryDistribution.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`R$ ${value.toFixed(2)}`]} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">Sem dados para exibir</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top products */}
      {topProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topProducts} layout="vertical" barSize={24}>
                <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={120} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="vendas" fill="#1e3a5f" radius={[0, 8, 8, 0]} name="Saídas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}