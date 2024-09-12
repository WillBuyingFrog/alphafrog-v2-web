// app/funds/layout.tsx
import React from "react";

import AlphaFrogSidebar from "@/components/af-sidebar/af-sidebar";

const sidebarItems = [
  { name: "基金查询", href: "/domestic-fund/query" },
  { name: "指数基金", href: "/domestic-fund/index" },
  { name: "QDII基金", href: "/domestic-fund/qdii" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-row h-screen">
      <div className="pt-16 px-6">
        <AlphaFrogSidebar items={sidebarItems} />
      </div>
      <div className=" max-w-7xl pt-16 px-6 flex-grow">
          {children}
      </div>
    </div>
  );
}
