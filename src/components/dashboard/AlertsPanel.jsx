import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, TrendingDown } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";

export default function AlertsPanel({ products }) {
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity <= (p.min_quantity || 5));
  const outOfStock = products.filter(p => p.quantity <= 0);
  
  const expiringSoon = products.filter(p => {
    if (!p.expiration_date) return false;
    const daysLeft = differenceInDays(parseISO(p.expiration_date), new Date());
    return daysLeft >= 0 && daysLeft <= 30;
  });

  const slowMoving = products.filter(p => {
    if (!p.last_movement_date || p.quantity <= 0) return false;
    const daysSince = differenceInDays(new Date(), parseISO(p.last_movement_date));
    return daysSince > 30;
  });

  const alerts = [
    ...outOfStock.map(p => ({
      type: "critical",
      icon: AlertTriangle,
      message: `${p.name} está esgotado`,
      badge: "Esgotado",
      badgeClass: "bg-red-100 text-red-700"
    })),
    ...lowStock.map(p => ({
      type: "warning",
      icon: AlertTriangle,
      message: `${p.name} — apenas ${p.quantity} ${p.unit || 'un.'} restantes`,
      badge: "Baixo",
      badgeClass: "bg-amber-100 text-amber-700"
    })),
    ...expiringSoon.map(p => {
      const daysLeft = differenceInDays(parseISO(p.expiration_date), new Date());
      return {
        type: "warning",
        icon: Clock,
        message: `${p.name} vence em ${daysLeft} dia(s)`,
        badge: "Validade",
        badgeClass: "bg-orange-100 text-orange-700"
      };
    }),
    ...slowMoving.map(p => ({
      type: "info",
      icon: TrendingDown,
      message: `${p.name} sem movimentação há mais de 30 dias — considere uma promoção`,
      badge: "Parado",
      badgeClass: "bg-blue-100 text-blue-700"
    })),
  ];

  if (alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Alertas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhum alerta no momento 🎉
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Alertas</CardTitle>
          <Badge variant="secondary" className="text-xs">{alerts.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 max-h-80 overflow-y-auto">
        {alerts.slice(0, 10).map((alert, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <alert.icon className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
            <p className="text-sm flex-1">{alert.message}</p>
            <Badge className={`${alert.badgeClass} text-xs shrink-0`}>{alert.badge}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}