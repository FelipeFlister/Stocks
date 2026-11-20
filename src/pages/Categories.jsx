import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Tags } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import EmptyState from "@/components/shared/EmptyState";

const PRESET_COLORS = ["#1e3a5f", "#f59e0b", "#10b981", "#ef4444", "#6366f1", "#ec4899", "#14b8a6", "#8b5cf6"];

const normalizeName = (value = "") => value.trim().replace(/\s+/g, " ").toLowerCase();

export default function Categories() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [nameError, setNameError] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: currentUser } = useCurrentUser();
  const uid = currentUser?.id;

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories", uid],
    queryFn: () => base44.entities.Category.filter({ created_by_id: uid }),
    enabled: !!uid,
  });

  const hasDuplicateName = (value) => {
    const normalized = normalizeName(value);
    if (!normalized) return false;
    return categories.some(
      (cat) => cat.id !== editing?.id && normalizeName(cat.name) === normalized
    );
  };

  const handleSave = () => {
    if (!name.trim()) {
      setNameError("Informe o nome da categoria.");
      return;
    }
    if (hasDuplicateName(name)) {
      setNameError("Já existe uma categoria com esse nome.");
      return;
    }
    setNameError("");
    saveMutation.mutate();
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = { name: name.trim(), description, color };
      if (editing) {
        await base44.entities.Category.update(editing.id, data);
      } else {
        await base44.entities.Category.create(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", uid] });
      toast({ title: editing ? "Categoria atualizada!" : "Categoria criada!" });
      closeDialog();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (cat) => base44.entities.Category.delete(cat.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", uid] });
      toast({ title: "Categoria excluída." });
    },
  });

  const openNew = () => { setEditing(null); setName(""); setDescription(""); setColor(PRESET_COLORS[0]); setNameError(""); setDialogOpen(true); };
  const openEdit = (cat) => { setEditing(cat); setName(cat.name); setDescription(cat.description || ""); setColor(cat.color || PRESET_COLORS[0]); setNameError(""); setDialogOpen(true); };
  const closeDialog = () => { setDialogOpen(false); setEditing(null); setNameError(""); };
  const handleDelete = (cat) => { if (confirm(`Excluir "${cat.name}"?`)) deleteMutation.mutate(cat); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="text-muted-foreground text-sm">Organize seus produtos por categorias</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      ) : categories.length === 0 ? (
        <EmptyState
          icon={Tags}
          title="Nenhuma categoria"
          description="Crie categorias para organizar melhor seus produtos."
          action={<Button onClick={openNew}><Plus className="w-4 h-4 mr-2" /> Nova Categoria</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Card key={cat.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: cat.color || "#6366f1" }} />
                  <div>
                    <h3 className="font-semibold text-sm">{cat.name}</h3>
                    {cat.description && <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(cat)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(cat)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome *</Label>
              <Input
                value={name}
                onChange={e => { setName(e.target.value); setNameError(""); }}
                className={nameError ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {nameError && <p className="text-xs text-destructive">{nameError}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Descrição</Label>
              <Input value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Cor</Label>
              <div className="flex gap-2 flex-wrap">
                {PRESET_COLORS.map(c => (
                  <button
                    key={c}
                    className={`w-8 h-8 rounded-lg transition-all ${color === c ? "ring-2 ring-ring ring-offset-2" : ""}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancelar</Button>
            <Button onClick={handleSave} disabled={!name.trim() || saveMutation.isPending}>
              {saveMutation.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}