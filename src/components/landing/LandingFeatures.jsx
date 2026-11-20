import React from "react";
import { Package, Bell, BarChart3, Truck, ArrowLeftRight, Tags, Shield, Database } from "lucide-react";

const features = [
  { icon: Package, title: "Gestão de Produtos", description: "Cadastre produtos com SKU, preços, validade e unidades de medida personalizadas." },
  { icon: ArrowLeftRight, title: "Movimentações", description: "Registre entradas e saídas com controle automático de quantidade e histórico completo." },
  { icon: Tags, title: "Categorias", description: "Organize seus produtos por categorias com cores e descrições personalizadas." },
  { icon: Truck, title: "Fornecedores", description: "Mantenha contatos e associe produtos aos seus fornecedores." },
  { icon: Bell, title: "Alertas Inteligentes", description: "Receba alertas de estoque baixo, validade próxima e produtos parados." },
  { icon: BarChart3, title: "Relatórios", description: "Visualize gráficos de atividade, distribuição e produtos mais vendidos." },
  { icon: Shield, title: "Backup Seguro", description: "Exporte e importe seus dados com validação estrutural completa." },
  { icon: Database, title: "Dados Isolados", description: "Cada usuário tem seus dados protegidos e isolados no sistema." },
];

export default function LandingFeatures() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Tudo que você precisa para gerenciar</h2>
          <p className="mt-3 text-muted-foreground">Funcionalidades completas para controle de estoque</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}