import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import EmptyState from "@/components/shared/EmptyState";

export default function Movements() {
  const { data: currentUser } = useCurrentUser();
  const uid = currentUser?.id;

  const { data: movements = [], isLoading } = useQuery({
    queryKey: ["movements-all", uid],
    queryFn: () => base44.entities.StockMovement.filter({ created_by_id: uid }, "-created_date", 200),
    enabled: !!uid,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Movimentações</h1>
        <p className="text-muted-foreground text-sm">Histórico de entradas e saídas</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      ) : movements.length === 0 ? (
        <EmptyState
          icon={ArrowLeftRight}
          title="Sem movimentações"
          description="As movimentações aparecerão aqui quando você registrar entradas ou saídas de produtos."
        />
      ) : (
        <div className="border rounded-xl overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Tipo</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Qtd</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">Valor Unit.</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">Total</TableHead>
                  <TableHead className="hidden md:table-cell">Observações</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((mov) => (
                  <TableRow key={mov.id}>
                    <TableCell>
                      <Badge className={`${
                        mov.type === "entrada" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-red-100 text-red-700"
                      } gap-1`}>
                        {mov.type === "entrada" 
                          ? <ArrowDownLeft className="w-3 h-3" />
                          : <ArrowUpRight className="w-3 h-3" />
                        }
                        {mov.type === "entrada" ? "Entrada" : "Saída"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {mov.product_name || "—"}
                    </TableCell>
                    <TableCell className="text-right text-sm">{mov.quantity}</TableCell>
                    <TableCell className="text-right text-sm hidden sm:table-cell">
                      R$ {(mov.unit_price || 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-sm font-medium hidden sm:table-cell">
                      R$ {(mov.total_value || 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell max-w-[200px] truncate">
                      {mov.notes || "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {format(parseISO(mov.created_date), "dd/MM/yy HH:mm", { locale: ptBR })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}