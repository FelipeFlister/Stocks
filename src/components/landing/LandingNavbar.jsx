import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    base44.auth.isAuthenticated().then(setIsAuthed).catch(() => {});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
  { label: "Funcionalidades", href: "#features" },
  { label: "Manual do Usuário", href: "#manual" },
  { label: "Sobre / Contato", href: "#about" }];


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Box className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">stocks</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) =>
          <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthed ?
          <Button asChild>
              <Link to="/dashboard">Entrar no sistema</Link>
            </Button> :

          <>
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Começar grátis</Link>
              </Button>
            </>
          }
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen &&
      <div className="md:hidden bg-background border-b">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) =>
          <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                {link.label}
              </a>
          )}
            <div className="pt-2 flex flex-col gap-2">
              {isAuthed ?
            <Button asChild><Link to="/dashboard">Entrar no sistema</Link></Button> :

            <>
                  <Button asChild variant="outline"><Link to="/login">Login</Link></Button>
                  <Button asChild><Link to="/register">Começar grátis</Link></Button>
                </>
            }
            </div>
          </div>
        </div>
      }
    </header>);

}