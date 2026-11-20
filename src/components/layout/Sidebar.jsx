import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  Tags,
  Menu,
  X,
  TrendingUp,
  Box,
  Truck,
  Bell,
  Settings,
  HelpCircle,
  BookOpen,
  LogOut } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

const navItems = [
{ path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
{ path: "/products", label: "Produtos", icon: Package },
{ path: "/movements", label: "Movimentações", icon: ArrowLeftRight },
{ path: "/categories", label: "Categorias", icon: Tags },
{ path: "/suppliers", label: "Fornecedores", icon: Truck },
{ path: "/alerts", label: "Alertas", icon: Bell },
{ path: "/reports", label: "Relatórios", icon: TrendingUp },
{ path: "/manual", label: "Manual", icon: BookOpen }];


export default function Sidebar({ isOpen, onToggle }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen &&
      <div
        className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
        onClick={onToggle} />

      }

      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-card shadow-md"
        onClick={onToggle}>
        
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-screen z-50 w-64
        bg-sidebar text-sidebar-foreground
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:relative lg:z-auto lg:shrink-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link
            to="/"
            title="Ir para a página inicial"
            onClick={() => window.innerWidth < 1024 && onToggle()}
            className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <Box className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">stocks</h1>
              <p className="text-xs text-sidebar-foreground/60">Gestão de Estoque</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onToggle()}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${isActive ?
                "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" :
                "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"}
                `
                }>
                
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>);

          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => base44.auth.logout()}
              className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200">
              <LogOut className="w-5 h-5" />
              Sair
            </button>
            <Link
              to="/settings"
              title="Configurações"
              className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 ${location.pathname === "/settings" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"}`}>
              <Settings className="w-5 h-5" />
            </Link>
            <Link
              to="/help"
              title="Ajuda & Suporte"
              className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 ${location.pathname === "/help" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"}`}>
              <HelpCircle className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-xs text-sidebar-foreground/40 text-center">stocks v1.1</p>
        </div>
      </aside>
    </>);

}