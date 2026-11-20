import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, TrendingUp, Bell } from "lucide-react";

export default function LandingHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Gestão de estoque inteligente
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
          Controle total do seu <span className="text-accent">estoque</span> em um só lugar
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Gerencie produtos, categorias, fornecedores e movimentações com alertas inteligentes e relatórios em tempo real.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/register">Começar agora <ArrowRight className="w-4 h-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#features">Ver funcionalidades</a>
          </Button>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="rounded-2xl border bg-card shadow-2xl p-6 text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <Package className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-2xl font-bold">248</p>
                <p className="text-xs text-muted-foreground">Produtos</p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4">
                <TrendingUp className="w-6 h-6 text-emerald-600 mb-2" />
                <p className="text-2xl font-bold">R$ 42k</p>
                <p className="text-xs text-muted-foreground">Capital</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <Bell className="w-6 h-6 text-amber-600 mb-2" />
                <p className="text-2xl font-bold">7</p>
                <p className="text-xs text-muted-foreground">Alertas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}