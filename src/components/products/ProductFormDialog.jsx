import React, { useState, useEffect } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { todayISO, isPastDate } from "@/lib/expiration";

const UNITS = [
  { value: "unidade", label: "Unidade" },
  { value: "kg", label: "Kg" },
  { value: "litro", label: "Litro" },
  { value: "metro", label: "Metro" },
  { value: "caixa", label: "Caixa" },
  { value: "pacote", label: "Pacote" },
];

const emptyForm = {
  name: "", sku: "", category_id: "", cost_price: "", sell_price: "",
  quantity: "", min_quantity: "5", expiration_date: "", unit: "unidade"
};

export default function ProductFormDialog({ open, onOpenChange, product, categories, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        sku: product.sku || "",
        category_id: product.category_id || "",
        cost_price: product.cost_price?.toString() || "",
        sell_price: product.sell_price?.toString() || "",
        quantity: product.quantity?.toString() || "0",
        min_quantity: product.min_quantity?.toString() || "5",
        expiration_date: product.expiration_date || "",
        unit: product.unit || "unidade",
      });
    } else {
      setForm(emptyForm);
    }
    setDateError("");
  }, [product, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPastDate(form.expiration_date)) {
      setDateError("A data de validade não pode ser anterior a hoje.");
      return;
    }
    setDateError("");
    setSaving(true);
    await onSave({
      ...form,
      cost_price: parseFloat(form.cost_price) || 0,
      sell_price: parseFloat(form.sell_price) || 0,
      quantity: parseInt(form.quantity) || 0,
      min_quantity: parseInt(form.min_quantity) || 5,
    });
    setSaving(false);
    onOpenChange(false);
  };

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Nome do produto *</Label>
              <Input value={form.name} onChange={e => set("name", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>SKU / Código</Label>
              <Input value={form.sku} onChange={e => set("sku", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select value={form.category_id} onValueChange={v => set("category_id", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Preço de custo (R$) *</Label>
              <Input type="number" step="0.01" min="0" value={form.cost_price} onChange={e => set("cost_price", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Preço de venda (R$) *</Label>
              <Input type="number" step="0.01" min="0" value={form.sell_price} onChange={e => set("sell_price", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Quantidade</Label>
              <Input type="number" min="0" value={form.quantity} onChange={e => set("quantity", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Qtd. mínima</Label>
              <Input type="number" min="0" value={form.min_quantity} onChange={e => set("min_quantity", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Unidade</Label>
              <Select value={form.unit} onValueChange={v => set("unit", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map(u => (
                    <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Data de validade</Label>
              <Input
                type="date"
                min={todayISO()}
                value={form.expiration_date}
                onChange={e => { set("expiration_date", e.target.value); setDateError(""); }}
                className={dateError ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {dateError && <p className="text-xs text-destructive">{dateError}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : product ? "Salvar" : "Criar Produto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}