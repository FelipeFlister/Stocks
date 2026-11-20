import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function RecentMovements({ movements }) {
  if (movements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Movimentações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma movimentação registrada
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Movimentações Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto">
        {movements.slice(0, 10).map((mov) => (
          <div
            key={mov.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
          >
            <div className={`p-2 rounded-lg ${
              mov.type === "entrada" ? "bg-emerald-100" : "bg-red-100"
            }`}>
              {mov.type === "entrada" 
                ? <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                : <ArrowUpRight className="w-4 h-4 text-red-600" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{mov.product_name || "Produto"}</p>
              <p className="text-xs text-muted-foreground">
                {format(parseISO(mov.created_date), "dd MMM, HH:mm", { locale: ptBR })}
              </p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-xs">
                {mov.type === "entrada" ? "+" : "-"}{mov.quantity} un.
              </Badge>
              {mov.total_value > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  R$ {mov.total_value.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}