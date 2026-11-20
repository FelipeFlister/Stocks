import React, { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function MovementDialog({ open, onOpenChange, product, type, onSave }) {
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const isEntry = type === "entrada";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qty = parseInt(quantity);
    if (!qty || qty <= 0) return;
    
    setSaving(true);
    const price = parseFloat(unitPrice) || (isEntry ? product.cost_price : product.sell_price) || 0;
    await onSave({
      product_id: product.id,
      type,
      quantity: qty,
      unit_price: price,
      total_value: qty * price,
      notes,
      product_name: product.name,
    });
    setSaving(false);
    setQuantity("");
    setUnitPrice("");
    setNotes("");
    onOpenChange(false);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEntry 
              ? <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
              : <ArrowUpRight className="w-5 h-5 text-red-500" />
            }
            {isEntry ? "Entrada" : "Saída"} — {product.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Quantidade *</Label>
            <Input 
              type="number" 
              min="1" 
              max={!isEntry ? product.quantity : undefined}
              value={quantity} 
              onChange={e => setQuantity(e.target.value)} 
              required 
              autoFocus
            />
            {!isEntry && (
              <p className="text-xs text-muted-foreground">
                Disponível: {product.quantity || 0} {product.unit || "un."}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Preço unitário (R$)</Label>
            <Input 
              type="number" 
              step="0.01" 
              min="0" 
              value={unitPrice} 
              onChange={e => setUnitPrice(e.target.value)}
              placeholder={`${(isEntry ? product.cost_price : product.sell_price || 0).toFixed(2)}`}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Observações</Label>
            <Textarea 
              value={notes} 
              onChange={e => setNotes(e.target.value)} 
              placeholder="Ex: Compra do fornecedor X"
              rows={2}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Registrando..." : "Registrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}