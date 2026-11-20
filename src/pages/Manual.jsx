import React from "react";
import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  Tags,
  Truck,
  Bell,
  TrendingUp,
  Settings,
  HelpCircle,
  UserPlus,
  BarChart3 } from
"lucide-react";

const quickStart = [
{ icon: UserPlus, title: "Crie sua conta", description: "Cadastre-se gratuitamente e acesse o painel." },
{ icon: Package, title: "Cadastre produtos", description: "Adicione produtos com categorias, preços e quantidades." },
{ icon: ArrowLeftRight, title: "Registre movimentações", description: "Controle entradas e saídas do estoque." },
{ icon: BarChart3, title: "Acompanhe relatórios", description: "Use gráficos e alertas para decidir melhor." }];


const sections = [
{
  icon: LayoutDashboard,
  title: "Dashboard",
  description: "Visão geral do seu estoque em tempo real.",
  items: [
  "Acompanhe total de produtos, capital investido e itens em falta.",
  "Veja o gráfico de movimentações e as últimas entradas e saídas.",
  "Use os cards para identificar rapidamente o que precisa de atenção."]

},
{
  icon: Package,
  title: "Produtos",
  description: "Cadastre e gerencie todos os seus itens.",
  items: [
  "Preencha nome, SKU, categoria, unidade de medida e preços de custo e venda.",
  "Defina a quantidade mínima para receber alertas de estoque baixo.",
  "Informe a data de validade quando o item for perecível.",
  "Use a importação para cadastrar vários produtos de uma vez."]

},
{
  icon: ArrowLeftRight,
  title: "Movimentações",
  description: "Registre entradas e saídas com histórico completo.",
  items: [
  "Escolha o produto, o tipo (entrada ou saída) e a quantidade.",
  "O valor total é calculado automaticamente pelo preço unitário.",
  "O estoque do produto é atualizado na hora após cada registro.",
  "Adicione observações para identificar o motivo da movimentação."]

},
{
  icon: Tags,
  title: "Categorias",
  description: "Organize seus produtos por grupos.",
  items: [
  "Crie categorias com nome, descrição e cor de identificação.",
  "Vincule produtos às categorias para filtrar e relatar com facilidade."]

},
{
  icon: Truck,
  title: "Fornecedores",
  description: "Mantenha os contatos e produtos fornecidos.",
  items: [
  "Cadastre nome, CNPJ/CPF, e-mail, telefone e endereço.",
  "Vincule os produtos fornecidos para saber de quem repor cada item."]

},
{
  icon: Bell,
  title: "Alertas",
  description: "Nunca fique sem os itens essenciais.",
  items: [
  "Receba avisos de estoque baixo, esgotado e validade próxima.",
  "Identifique produtos sem movimentação recente (estoque parado).",
  "Filtre por tipo de alerta e dispense os que já foram resolvidos."]

},
{
  icon: TrendingUp,
  title: "Relatórios",
  description: "Analise o desempenho do seu negócio.",
  items: [
  "Veja o valor total do estoque e a margem de lucro por produto.",
  "Compare entradas e saídas ao longo do tempo.",
  "Descubra os produtos mais movimentados e a distribuição por categoria."]

},
{
  icon: Settings,
  title: "Configurações",
  description: "Personalize sua conta e proteja seus dados.",
  items: [
  "Atualize seu nome e foto de perfil.",
  "Exporte um backup completo dos seus dados em JSON.",
  "Importe um backup para restaurar as informações quando precisar.",
  "Ative a verificação em duas etapas (2FA) para mais segurança."]

},
{
  icon: HelpCircle,
  title: "Ajuda & Suporte",
  description: "Precisa de uma mãozinha?",
  items: [
  "Confira as novidades e o histórico de versões do sistema.",
  "Entre em contato com o suporte para dúvidas ou problemas."]

}];


export default function Manual() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Manual do Usuário</h1>
        <p className="text-muted-foreground">Tes

        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Primeiros passos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStart.map((s) =>
          <div key={s.title} className="rounded-xl border bg-card p-5 h-full">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                <s.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Guia por módulo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((s) =>
          <div key={s.title} className="rounded-xl border bg-card p-6 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {s.items.map((item, i) =>
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>{item}</span>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>);

}