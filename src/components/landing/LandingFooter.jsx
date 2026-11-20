import React from "react";
import { Link } from "react-router-dom";
import { Box, Mail, MessageCircle, MapPin } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer id="about" className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                <Box className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">stocks</span>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-xs">
              Sistema completo de gestão de estoque para pequenas e médias empresas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Sobre</h4>
            <p className="text-sm text-primary-foreground/70">O stocks nasceu da necessidade de simplificar o controle de estoque. Com uma interface intuitiva e recursos poderosos, ajudamos empresas a manterem seus inventários organizados e atualizados.

            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <a href="mailto:contato@stocsk.app" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground">
                <Mail className="w-4 h-4" /> contato@stocsk.app
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground">
                <MessageCircle className="w-4 h-4" /> Suporte ao cliente
              </a>
              <p className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4" /> Brasil
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">© 2026 stocks. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link to="/login" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">Login</Link>
            <Link to="/register" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">Cadastro</Link>
          </div>
        </div>
      </div>
    </footer>);

}