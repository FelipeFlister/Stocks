import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LandingCTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-primary text-primary-foreground p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Pronto para organizar seu estoque?</h2>
          <p className="mt-4 text-primary-foreground/80">Comece agora e tenha controle total do seu inventário.</p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/register">Criar conta gratuita <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}