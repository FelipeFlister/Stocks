import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProductTable from "@/components/products/ProductTable";
import ProductFormDialog from "@/components/products/ProductFormDialog";
import MovementDialog from "@/components/products/MovementDialog";
import ImportDialog from "@/components/products/ImportDialog";
import EmptyState from "@/components/shared/EmptyState";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Products() {
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [movProduct, setMovProduct] = useState(null);
  const [movType, setMovType] = useState("entrada");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: currentUser } = useCurrentUser();
  const uid = currentUser?.id;

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", uid],
    queryFn: () => base44.entities.Product.filter({ created_by_id: uid }, "-created_date", 500),
    enabled: !!uid,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories", uid],
    queryFn: () => base44.entities.Category.filter({ created_by_id: uid }),
    enabled: !!uid,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["products", uid] });
    queryClient.invalidateQueries({ queryKey: ["movements-recent", uid] });
  };

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (editProduct) {
        await base44.entities.Product.update(editProduct.id, data);
      } else {
        await base44.entities.Product.create(data);
      }
    },
    onSuccess: () => {
      invalidate();
      toast({ title: editProduct ? "Produto atualizado!" : "Produto criado!" });
      setEditProduct(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (product) => base44.entities.Product.delete(product.id),
    onSuccess: () => {
      invalidate();
      toast({ title: "Produto excluído." });
    },
  });

  const movementMutation = useMutation({
    mutationFn: async (movData) => {
      await base44.entities.StockMovement.create(movData);
      const product = products.find(p => p.id === movData.product_id);
      const newQty = movData.type === "entrada"
        ? (product.quantity || 0) + movData.quantity
        : Math.max(0, (product.quantity || 0) - movData.quantity);
      await base44.entities.Product.update(product.id, {
        quantity: newQty,
        last_movement_date: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      invalidate();
      toast({ title: "Movimentação registrada!" });
    },
  });

  const handleEdit = (product) => { setEditProduct(product); setFormOpen(true); };
  const handleNewProduct = () => { setEditProduct(null); setFormOpen(true); };
  const handleMovement = (product, type) => { setMovProduct(product); setMovType(type); };
  const handleDelete = (product) => {
    if (confirm(`Excluir "${product.name}"?`)) deleteMutation.mutate(product);
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-muted-foreground text-sm">{products.length} produtos cadastrados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setImportOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
          <Button onClick={handleNewProduct}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      {products.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou código..."
            className="pl-10 max-w-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          title="Nenhum produto cadastrado"
          description="Comece adicionando seus produtos manualmente ou importando uma planilha."
          action={
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setImportOpen(true)}>
                <Upload className="w-4 h-4 mr-2" /> Importar
              </Button>
              <Button onClick={handleNewProduct}>
                <Plus className="w-4 h-4 mr-2" /> Novo Produto
              </Button>
            </div>
          }
        />
      ) : (
        <ProductTable
          products={filtered}
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMovement={handleMovement}
        />
      )}

      <ProductFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editProduct}
        categories={categories}
        onSave={(data) => saveMutation.mutateAsync(data)}
      />

      <MovementDialog
        open={!!movProduct}
        onOpenChange={(open) => !open && setMovProduct(null)}
        product={movProduct}
        type={movType}
        onSave={(data) => movementMutation.mutateAsync(data)}
      />

      <ImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        onImported={invalidate}
      />
    </div>
  );
}