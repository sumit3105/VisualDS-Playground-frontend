import React from "react";
import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn("rounded-2xl border bg-white text-gray-800 shadow-md p-4", className)}
      {...props}
    />
  );
}
