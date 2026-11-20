import React, { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { isPastDate } from "@/lib/expiration";

export default function ImportDialog({ open, onOpenChange, onImported }) {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const handleImport = async () => {
    if (!file) return;
    setImporting(true);
    setResult(null);

    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    
    const extracted = await base44.integrations.Core.ExtractDataFromUploadedFile({
      file_url,
      json_schema: {
        type: "object",
        properties: {
          products: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                sku: { type: "string" },
                cost_price: { type: "number" },
                sell_price: { type: "number" },
                quantity: { type: "number" },
                min_quantity: { type: "number" },
                unit: { type: "string" },
                expiration_date: { type: "string" }
              }
            }
          }
        }
      }
    });

    if (extracted.status === "success" && extracted.output?.products?.length > 0) {
      const named = extracted.output.products.filter(p => p.name);
      const products = named.filter(p => !isPastDate(p.expiration_date));
      const skipped = named.length - products.length;

      if (products.length > 0) {
        await base44.entities.Product.bulkCreate(products);
      }

      setResult({ count: products.length, skipped });
      toast({
        title: `${products.length} produtos importados com sucesso!`,
        description: skipped > 0 ? `${skipped} produto(s) ignorado(s) por data de validade anterior a hoje.` : undefined
      });
      onImported();
    } else {
      toast({ title: "Erro na importação", description: "Verifique o formato do arquivo.", variant: "destructive" });
    }
    setImporting(false);
  };

  const handleClose = () => {
    setFile(null);
    setResult(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importar Produtos</DialogTitle>
          <DialogDescription>
            Envie uma planilha Excel ou CSV com os dados dos produtos.
          </DialogDescription>
        </DialogHeader>

        {result ? (
          <div className="flex flex-col items-center py-8 gap-3">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
            <p className="text-lg font-semibold">{result.count} produtos importados!</p>
            {result.skipped > 0 && (
              <p className="text-sm text-muted-foreground text-center">
                {result.skipped} produto(s) ignorado(s): data de validade anterior a hoje.
              </p>
            )}
            <Button onClick={handleClose}>Fechar</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Arraste ou clique para selecionar</p>
                </div>
              )}
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                <strong>Colunas esperadas:</strong> nome, sku, preço_custo, preço_venda, quantidade, qtd_mínima, unidade, validade
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleImport} disabled={!file || importing}>
                {importing ? "Importando..." : "Importar"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}