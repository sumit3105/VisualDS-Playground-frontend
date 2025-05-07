import React from "react";
import { cn } from "../../lib/utils";

export function CardContent({ className, ...props }) {
  return (
    <div className={cn("p-4 pt-0 text-sm text-gray-600", className)} {...props} />
  );
}
