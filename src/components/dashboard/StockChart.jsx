import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function StockChart({ products, categories }) {
  const categoryMap = {};
  categories.forEach(c => { categoryMap[c.id] = c.name; });

  const data = {};
  products.forEach(p => {
    const catName = categoryMap[p.category_id] || "Sem categoria";
    if (!data[catName]) data[catName] = { name: catName, value: 0, cost: 0 };
    data[catName].value += (p.quantity || 0);
    data[catName].cost += (p.quantity || 0) * (p.cost_price || 0);
  });

  const chartData = Object.values(data).sort((a, b) => b.cost - a.cost).slice(0, 8);
  const colors = ["#1e3a5f", "#f59e0b", "#10b981", "#ef4444", "#6366f1", "#ec4899", "#14b8a6", "#8b5cf6"];

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Capital por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Cadastre produtos para ver o gráfico
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Capital por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} barSize={32}>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `R$${v >= 1000 ? (v/1000).toFixed(0) + 'k' : v}`}
            />
            <Tooltip 
              formatter={(value) => [`R$ ${value.toFixed(2)}`, "Capital"]}
              contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }}
            />
            <Bar dataKey="cost" radius={[8, 8, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}