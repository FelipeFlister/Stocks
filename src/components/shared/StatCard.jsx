import React from "react";
import { Card } from "@/components/ui/card";

export default function StatCard({ title, value, subtitle, icon: Icon, iconColor }) {
  return (
    <Card className="p-5 relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconColor || "bg-primary/10"}`}>
          <Icon className="w-5 h-5 text-foreground/70" />
        </div>
      </div>
    </Card>
  );
}