import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Pencil, Trash2, Phone, Mail, MapPin, FileText } from "lucide-react";
import SupplierFormDialog from "@/components/suppliers/SupplierFormDialog";
import EmptyState from "@/components/shared/EmptyState";
import { Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Suppliers() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: currentUser } = useCurrentUser();
  const uid = currentUser?.id;

  const { data: suppliers = [], isLoading } = useQuery({
    queryKey: ["suppliers", uid],
    queryFn: () => base44.entities.Supplier.filter({ created_by_id: uid }, "-created_date", 200),
    enabled: !!uid,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products", uid],
    queryFn: () => base44.entities.Product.filter({ created_by_id: uid }, "-created_date", 500),
    enabled: !!uid,
  });

  const saveMutation = useMutation({
    mutationFn: (data) =>
      editing
        ? base44.entities.Supplier.update(editing.id, data)
        : base44.entities.Supplier.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["suppliers", uid] });
      setDialogOpen(false);
      setEditing(null);
      toast({ title: editing ? "Fornecedor atualizado" : "Fornecedor cadastrado" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Supplier.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["suppliers", uid] });
      toast({ title: "Fornecedor removido" });
    },
  });

  const filtered = suppliers.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.cnpj_cpf?.includes(search)
  );

  const getProductNames = (ids = []) => {
    return ids
      .map((id) => products.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Fornecedores</h1>
          <p className="text-muted-foreground text-sm">Gerencie seus fornecedores</p>
        </div>
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Novo Fornecedor
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Buscar por nome, e-mail ou CNPJ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-44 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Truck}
          title="Nenhum fornecedor encontrado"
          description="Cadastre fornecedores para vinculá-los aos seus produtos."
          action={
            <Button onClick={() => { setEditing(null); setDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" /> Cadastrar Fornecedor
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <Card key={s.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold leading-tight">{s.name}</p>
                    {s.cnpj_cpf && <p className="text-xs text-muted-foreground">{s.cnpj_cpf}</p>}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditing(s); setDialogOpen(true); }}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteMutation.mutate(s.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-1.5 text-sm text-muted-foreground">
                  {s.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>{s.phone}</span>
                    </div>
                  )}
                  {s.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{s.email}</span>
                    </div>
                  )}
                  {s.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{s.address}</span>
                    </div>
                  )}
                  {s.notes && (
                    <div className="flex items-start gap-2">
                      <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{s.notes}</span>
                    </div>
                  )}
                </div>

                {s.product_ids?.length > 0 && (
                  <div className="pt-1 border-t">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Produtos: </span>
                      {getProductNames(s.product_ids) || "—"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <SupplierFormDialog
        open={dialogOpen}
        onOpenChange={(v) => { setDialogOpen(v); if (!v) setEditing(null); }}
        supplier={editing}
        products={products}
        onSave={(data) => saveMutation.mutate(data)}
        isSaving={saveMutation.isPending}
      />
    </div>
  );
}