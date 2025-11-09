import React from "react";

export default function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-gray-800 animate-pulse rounded ${className}`} />;
}
