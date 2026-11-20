import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MessageCircle, Clock, History, Shield } from "lucide-react";

const changelog = [
{
  version: "1.1.0",
  date: "Julho 2026",
  changes: [
  "Página pública de vendas (Landing Page)",
  "Central de Ajuda & Suporte",
  "Importação de backup com validação estrutural",
  "Correção do fechamento de notificações",
  "Página de Configurações do usuário",
  "Isolamento de dados por usuário (multi-tenancy)"]

},
{
  version: "1.0.0",
  date: "Junho 2026",
  changes: [
  "Lançamento inicial",
  "Gestão de produtos e categorias",
  "Controle de movimentações de estoque",
  "Sistema de alertas inteligentes",
  "Relatórios e gráficos",
  "Gestão de fornecedores"]

}];


export default function HelpSupport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ajuda & Suporte</h1>
        <p className="text-muted-foreground text-sm">Estamos aqui para ajudar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contato e Suporte</CardTitle>
            <CardDescription>Canais de atendimento para clientes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">E-mail</p>
                <p className="text-sm text-muted-foreground">contato@stocks.app</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Chat</p>
                <p className="text-sm text-muted-foreground">Suporte via chat no painel</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Horário de atendimento</p>
                <p className="text-sm text-muted-foreground">Seg a Sex, 9h às 18h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Versão do Sistema</CardTitle>
            <CardDescription>Informações da versão atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <p className="text-lg font-bold">stocks v1.1.0</p>
                <p className="text-xs text-muted-foreground">Última atualização: Julho 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Histórico de Atualizações
          </CardTitle>
          <CardDescription>Melhorias e correções recentes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {changelog.map((entry) =>
          <div key={entry.version} className="border-l-2 border-primary/20 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">v{entry.version}</span>
                <span className="text-xs text-muted-foreground">{entry.date}</span>
              </div>
              <ul className="space-y-1">
                {entry.changes.map((change, i) =>
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                    {change}
                  </li>
              )}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>);

}