import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Download, Shield, Database, Loader2 } from "lucide-react";

export default function BackupSection() {
  const { data: currentUser } = useCurrentUser();
  const uid = currentUser?.id;
  const { toast } = useToast();
  const [backingUp, setBackingUp] = useState(false);

  const handleBackup = async () => {
    if (!uid) return;
    try {
      setBackingUp(true);
      const [products, categories, suppliers, movements] = await Promise.all([
        base44.entities.Product.filter({ created_by_id: uid }, "-created_date", 1000),
        base44.entities.Category.filter({ created_by_id: uid }, "-created_date", 1000),
        base44.entities.Supplier.filter({ created_by_id: uid }, "-created_date", 1000),
        base44.entities.StockMovement.filter({ created_by_id: uid }, "-created_date", 1000),
      ]);

      const backup = {
        metadata: {
          app: "stocsk",
          exported_at: new Date().toISOString(),
          user: currentUser?.email,
          version: "1.0",
        },
        products,
        categories,
        suppliers,
        stock_movements: movements,
      };

      const dataStr = JSON.stringify(backup, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `stocsk-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({ title: "Backup gerado com sucesso" });
    } catch (err) {
      toast({ title: "Erro ao gerar backup", variant: "destructive" });
    } finally {
      setBackingUp(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Segurança e Manutenção
        </CardTitle>
        <CardDescription>Faça backup dos seus dados e mantenha-os seguros</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/30">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">Backup de dados</h4>
            <p className="text-xs text-muted-foreground mt-1 mb-3">
              Exporte todos os seus produtos, categorias, fornecedores e movimentações em um arquivo JSON.
            </p>
            <Button onClick={handleBackup} disabled={backingUp || !uid}>
              {backingUp ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gerando backup...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Baixar backup
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}