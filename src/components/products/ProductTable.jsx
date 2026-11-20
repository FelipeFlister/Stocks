import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import StockBadge from "@/components/shared/StockBadge";

export default function ProductTable({ products, categories, onEdit, onDelete, onMovement }) {
  const categoryMap = {};
  categories.forEach(c => { categoryMap[c.id] = c.name; });

  return (
    <div className="border rounded-xl overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Produto</TableHead>
              <TableHead className="hidden sm:table-cell">Categoria</TableHead>
              <TableHead className="text-right">Estoque</TableHead>
              <TableHead className="text-right hidden sm:table-cell">Custo</TableHead>
              <TableHead className="text-right hidden md:table-cell">Venda</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-muted/30">
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    {product.sku && <p className="text-xs text-muted-foreground">{product.sku}</p>}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                  {categoryMap[product.category_id] || "—"}
                </TableCell>
                <TableCell className="text-right text-sm font-medium">
                  {product.quantity || 0} {product.unit || "un."}
                </TableCell>
                <TableCell className="text-right text-sm hidden sm:table-cell">
                  R$ {(product.cost_price || 0).toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-sm hidden md:table-cell">
                  R$ {(product.sell_price || 0).toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  <StockBadge quantity={product.quantity || 0} minQuantity={product.min_quantity || 5} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onMovement(product, "entrada")}>
                        <ArrowDownLeft className="w-4 h-4 mr-2 text-emerald-600" />
                        Entrada
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onMovement(product, "saida")}>
                        <ArrowUpRight className="w-4 h-4 mr-2 text-red-500" />
                        Saída
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(product)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => onDelete(product)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}