"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  {
    name: "My Profile",
    href: "/dashboard/me",
    icon: "/Sidebar/sidebar_home.png",
    activeIcon: "/Sidebar/sidebar_home_active.png",
  },
  {
    name: "Document Generator",
    href: "/dashboard/document-generator",
    icon: "/Sidebar/sidebar_document.png",
    activeIcon: "/Sidebar/sidebar_document_active.png",
  },
  {
    name: "Document Analyzer",
    href: "/dashboard/document-analyzer",
    icon: "/Sidebar/sidebar_analyzer.png",
    activeIcon: "/Sidebar/sidebar_analyzer_active.png",
  },
  {
    name: "AI Chat Bot",
    href: "/dashboard/chat",
    icon: "/Sidebar/sidebar_chatbot.png",
    activeIcon: "/Sidebar/sidebar_chatbot_active.png",
  },
  {
    name: "Find Lawyer",
    href: "/dashboard/find-lawyer",
    icon: "/Sidebar/sidebar_lawyer.png",
    activeIcon: "/Sidebar/sidebar_lawyer_active.png",
  },
  {
    name: "History",
    href: "/dashboard/history",
    icon: "/Sidebar/sidebar_history.png",
    activeIcon: "/Sidebar/sidebar_history_active.png",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg">
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white border-r z-40 
          w-[280px] md:w-[300px] lg:w-[340px]
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="px-6 py-8 flex justify-center">
          <Link href="/" className="flex items-center">
            <Image src="/Sidebar/sidebar_logo_black.png" alt="NaviGo Logo" width={140} height={80} priority className="w-[140px] h-auto" />
          </Link>
        </div>

        <div className="flex justify-center my-6">
          <div className="w-[90%] h-px bg-gray-200" />
        </div>

        <nav className="px-0">
          <ul className="space-y-1 mt-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name} className="relative">
                  <div className={`absolute left-0 top-0 w-1 h-full ${isActive ? "bg-[#61008D]" : ""}`} />
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-4 text-sm md:text-md pl-6 transition-colors relative ${isActive ? "bg-linear-to-bl from-[#FFFFFF] to-[#FCF2FF] text-[#000000] font-medium" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    <Image src={isActive ? item.activeIcon : item.icon} alt={`${item.name} icon`} width={20} height={20} className="mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto px-6 py-4">
            <button onClick={logout} className="w-full py-2 px-4 bg-purple-100 text-purple-800 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-200 transition-colors">
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
