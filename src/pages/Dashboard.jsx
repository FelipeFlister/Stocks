import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Package, DollarSign, AlertTriangle, ArrowLeftRight } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import StockChart from "@/components/dashboard/StockChart";
import RecentMovements from "@/components/dashboard/RecentMovements";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Dashboard() {
  const { data: currentUser } = useCurrentUser();
  const uid = currentUser?.id;

  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ["products", uid],
    queryFn: () => base44.entities.Product.filter({ created_by_id: uid }, "-created_date", 500),
    enabled: !!uid,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories", uid],
    queryFn: () => base44.entities.Category.filter({ created_by_id: uid }),
    enabled: !!uid,
  });

  const { data: movements = [] } = useQuery({
    queryKey: ["movements-recent", uid],
    queryFn: () => base44.entities.StockMovement.filter({ created_by_id: uid }, "-created_date", 20),
    enabled: !!uid,
  });

  const totalProducts = products.length;
  const totalCapital = products.reduce((sum, p) => sum + (p.quantity || 0) * (p.cost_price || 0), 0);
  const lowStockCount = products.filter(p => p.quantity > 0 && p.quantity <= (p.min_quantity || 5)).length;
  const totalItems = products.reduce((sum, p) => sum + (p.quantity || 0), 0);

  if (loadingProducts) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Visão geral do seu estoque</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Visão geral do seu estoque</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Produtos"
          value={totalProducts}
          subtitle={`${totalItems} itens em estoque`}
          icon={Package}
          iconColor="bg-blue-50"
        />
        <StatCard
          title="Capital em Estoque"
          value={`R$ ${totalCapital.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          subtitle="Investimento total"
          icon={DollarSign}
          iconColor="bg-emerald-50"
        />
        <StatCard
          title="Estoque Baixo"
          value={lowStockCount}
          subtitle="Produtos para repor"
          icon={AlertTriangle}
          iconColor="bg-amber-50"
        />
        <StatCard
          title="Movimentações"
          value={movements.length}
          subtitle="Últimas registradas"
          icon={ArrowLeftRight}
          iconColor="bg-purple-50"
        />
      </div>

      {/* Charts & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StockChart products={products} categories={categories} />
        <AlertsPanel products={products} />
      </div>

      {/* Recent movements */}
      <RecentMovements movements={movements} />
    </div>
  );
}