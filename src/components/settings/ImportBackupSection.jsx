import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileCheck, Loader2, AlertCircle, Check } from "lucide-react";

function validateBackup(data) {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return { valid: false, error: "Estrutura de arquivo inválida" };
  }
  if (!data.metadata || typeof data.metadata !== "object") {
    return { valid: false, error: "Metadados ausentes no arquivo de backup" };
  }
  if (data.metadata.app !== "stocsk") {
    return { valid: false, error: "O arquivo não é um backup do stocsk" };
  }

  const requiredKeys = ["products", "categories", "suppliers", "stock_movements"];
  for (const key of requiredKeys) {
    if (!(key in data)) {
      return { valid: false, error: `Chave "${key}" ausente no backup` };
    }
    if (!Array.isArray(data[key])) {
      return { valid: false, error: `"${key}" deve ser uma lista` };
    }
  }

  for (const p of data.products) {
    if (typeof p !== "object" || p === null) {
      return { valid: false, error: "Produto inválido encontrado no backup" };
    }
    if (!("name" in p) || !("cost_price" in p) || !("sell_price" in p)) {
      return { valid: false, error: "Produto com campos obrigatórios ausentes" };
    }
  }

  for (const c of data.categories) {
    if (typeof c !== "object" || c === null || !("name" in c)) {
      return { valid: false, error: "Categoria inválida encontrada no backup" };
    }
  }

  for (const s of data.suppliers) {
    if (typeof s !== "object" || s === null || !("name" in s)) {
      return { valid: false, error: "Fornecedor inválido encontrado no backup" };
    }
  }

  for (const m of data.stock_movements) {
    if (typeof m !== "object" || m === null) {
      return { valid: false, error: "Movimentação inválida encontrada no backup" };
    }
    if (!("product_id" in m) || !("type" in m) || !("quantity" in m)) {
      return { valid: false, error: "Movimentação com campos obrigatórios ausentes" };
    }
    if (m.type !== "entrada" && m.type !== "saida") {
      return { valid: false, error: "Tipo de movimentação inválido no backup" };
    }
  }

  return {
    valid: true,
    data: {
      products: data.products,
      categories: data.categories,
      suppliers: data.suppliers,
      stock_movements: data.stock_movements,
    },
    counts: {
      products: data.products.length,
      categories: data.categories.length,
      suppliers: data.suppliers.length,
      movements: data.stock_movements.length,
    },
  };
}

export default function ImportBackupSection() {
  const { data: currentUser } = useCurrentUser();
  const uid = currentUser?.id;
  const qc = useQueryClient();
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const [importing, setImporting] = useState(false);
  const [validation, setValidation] = useState(null);
  const [error, setError] = useState("");

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setValidation(null);
    e.target.value = "";

    try {
      setImporting(true);
      const text = await file.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setError("O arquivo não é um JSON válido");
        return;
      }

      const result = validateBackup(data);
      if (!result.valid) {
        setError(result.error);
        return;
      }
      setValidation(result);
    } catch (err) {
      setError("Erro ao processar o arquivo.");
    } finally {
      setImporting(false);
    }
  };

  const handleConfirmImport = async () => {
    if (!validation?.data || !uid) return;
    try {
      setImporting(true);
      const { products, categories, suppliers, stock_movements } = validation.data;
      const clean = (arr) => arr.map(({ id, created_date, updated_date, created_by_id, ...rest }) => rest);

      if (categories.length) await base44.entities.Category.bulkCreate(clean(categories));
      if (products.length) await base44.entities.Product.bulkCreate(clean(products));
      if (suppliers.length) await base44.entities.Supplier.bulkCreate(clean(suppliers));
      if (stock_movements.length) await base44.entities.StockMovement.bulkCreate(clean(stock_movements));

      qc.invalidateQueries();
      toast({ title: "Backup importado com sucesso!" });
      setValidation(null);
    } catch (err) {
      toast({ title: "Erro ao importar dados", variant: "destructive" });
    } finally {
      setImporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Importar Backup
        </CardTitle>
        <CardDescription>Restaure seus dados a partir de um arquivo de backup</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/30">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <Upload className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">Restaurar dados</h4>
            <p className="text-xs text-muted-foreground mt-1 mb-3">
              Selecione um arquivo de backup (.json) gerado pelo stocsk. O arquivo será validado estruturalmente antes da importação.
            </p>
            <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleFileSelect} />
            <Button onClick={() => fileInputRef.current?.click()} disabled={importing || !uid}>
              {importing ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</>
              ) : (
                <><Upload className="w-4 h-4" /> Selecionar arquivo</>
              )}
            </Button>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {validation && (
          <div className="p-4 rounded-lg border bg-emerald-50/50 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700">
              <FileCheck className="w-5 h-5" />
              <span className="font-medium text-sm">Arquivo validado com sucesso!</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div><span className="font-medium">{validation.counts.products}</span> <span className="text-muted-foreground">produtos</span></div>
              <div><span className="font-medium">{validation.counts.categories}</span> <span className="text-muted-foreground">categorias</span></div>
              <div><span className="font-medium">{validation.counts.suppliers}</span> <span className="text-muted-foreground">fornecedores</span></div>
              <div><span className="font-medium">{validation.counts.movements}</span> <span className="text-muted-foreground">movimentações</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Os dados serão adicionados ao seu estoque atual.</p>
            <div className="flex gap-2">
              <Button onClick={handleConfirmImport} disabled={importing}>
                {importing ? <><Loader2 className="w-4 h-4 animate-spin" /> Importando...</> : <><Check className="w-4 h-4" /> Confirmar importação</>}
              </Button>
              <Button variant="outline" onClick={() => setValidation(null)}>Cancelar</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}