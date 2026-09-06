"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Heart, Settings } from "lucide-react";

const items = [
  { href: "/", label: "Início", icon: Home },
  { href: "/custom", label: "Criar", icon: Sparkles },
  { href: "/favoritos", label: "Favoritos", icon: Heart },
  { href: "/config", label: "Ajustes", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-[#0a0b12]/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-lg mx-auto grid grid-cols-4 h-16">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 text-[11px] transition ${
                active ? "text-white" : "text-zinc-500"
              }`}
            >
              <Icon className={`w-[18px] h-[18px] ${active ? "text-cyan-300" : ""}`} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
