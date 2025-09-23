"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Settings, LayoutDashboard, Notebook } from "lucide-react"; // added Notebook for leads

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/crm", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { href: "/crm/leads", label: "Leads", icon: <Notebook size={18} /> },
    { href: "/crm/users", label: "Users", icon: <Users size={18} /> },
    { href: "/crm/settings", label: "Settings", icon: <Settings size={18} /> },
    { href: "/crm/posts", label: "Posts", icon: <Notebook size={18} /> },
    { href: "/crm/topics", label: "Topics", icon: <Notebook size={18} /> },
    { href: "/crm/writer", label: "AI Writer", icon: <Notebook size={18} /> },

  ];

  return (
    <aside className="bg-base-200 text-base-content w-60 min-h-screen shadow-md flex flex-col">
      {/* Logo / Brand */}
      <div className="px-4 py-6 border-b border-base-300">
        <h2 className="text-2xl font-bold tracking-tight">AtrinWebDev CRM</h2>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 transition ${
                isActive
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-300"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
