import React from "react";
import { UserPlus, Package, ArrowLeftRight, BarChart3 } from "lucide-react";

const steps = [
  { icon: UserPlus, step: "1", title: "Crie sua conta", description: "Cadastre-se gratuitamente e acesse o painel em segundos." },
  { icon: Package, step: "2", title: "Cadastre produtos", description: "Adicione produtos com categorias, preços e quantidades iniciais." },
  { icon: ArrowLeftRight, step: "3", title: "Registre movimentações", description: "Controle entradas e saídas para manter o estoque sempre atualizado." },
  { icon: BarChart3, step: "4", title: "Acompanhe relatórios", description: "Visualize gráficos e alertas para tomar decisões inteligentes." },
];

export default function LandingManual() {
  return (
    <section id="manual" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Como funciona</h2>
          <p className="mt-3 text-muted-foreground">Comece a usar em 4 passos simples</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="rounded-xl border bg-card p-6 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-2xl font-bold text-muted-foreground/30">{s.step}</span>
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}