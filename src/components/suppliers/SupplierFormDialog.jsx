import React, { useState, useEffect } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EMPTY = { name: "", cnpj_cpf: "", email: "", phone: "", address: "", product_ids: [], notes: "" };

export default function SupplierFormDialog({ open, onOpenChange, supplier, products = [], onSave, isSaving }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(supplier ? { ...EMPTY, ...supplier } : EMPTY);
  }, [supplier, open]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const toggleProduct = (id) => {
    const ids = form.product_ids || [];
    set("product_ids", ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{supplier ? "Editar Fornecedor" : "Novo Fornecedor"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Nome / Razão Social *</Label>
              <Input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex: Distribuidora Silva Ltda" />
            </div>
            <div className="space-y-1.5">
              <Label>CNPJ / CPF</Label>
              <Input value={form.cnpj_cpf} onChange={(e) => set("cnpj_cpf", e.target.value)} placeholder="00.000.000/0001-00" />
            </div>
            <div className="space-y-1.5">
              <Label>Telefone</Label>
              <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(11) 99999-0000" />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label>E-mail</Label>
              <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="contato@fornecedor.com" />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Endereço</Label>
              <Input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Rua, número, cidade..." />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Observações</Label>
              <Input value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Condições de pagamento, prazo de entrega..." />
            </div>
          </div>

          {products.length > 0 && (
            <div className="space-y-2">
              <Label>Produtos Fornecidos</Label>
              <div className="max-h-40 overflow-y-auto border rounded-lg p-3 space-y-2">
                {products.map((p) => (
                  <label key={p.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(form.product_ids || []).includes(p.id)}
                      onChange={() => toggleProduct(p.id)}
                      className="rounded"
                    />
                    {p.name}
                  </label>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={isSaving}>{isSaving ? "Salvando..." : "Salvar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}