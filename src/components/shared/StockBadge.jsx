import React from "react";
import { Badge } from "@/components/ui/badge";

export default function StockBadge({ quantity, minQuantity }) {
  if (quantity <= 0) {
    return (
      <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
        Esgotado
      </Badge>
    );
  }
  if (quantity <= minQuantity) {
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
        Baixo
      </Badge>
    );
  }
  return (
    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
      Saudável
    </Badge>
  );
}