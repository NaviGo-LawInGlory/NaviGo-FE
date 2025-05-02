"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
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
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white shadow-lg">
        {isMobileMenuOpen ? <X className="w-6 h-6 text-purple-700" /> : <Menu className="w-6 h-6 text-purple-700" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white z-40 
          w-[280px] md:w-[280px] lg:w-[300px]
          transition-all duration-300 ease-in-out
          shadow-[5px_0_25px_-15px_rgba(0,0,0,0.15)]
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="px-6 py-10 flex justify-center">
          <Link href="/" className="flex items-center">
            <Image src="/Sidebar/sidebar_logo_black.png" alt="NaviGo Logo" width={120} height={80} priority className="w-[120px] h-auto" />
          </Link>
        </div>

        <div className="flex justify-center my-6">
          <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        <nav className="px-0">
          <ul className="space-y-2 mt-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name} className="relative mx-4">
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-5 py-4 text-sm md:text-md
                      rounded-xl transition-all duration-200
                      ${isActive ? "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-900 font-medium shadow-sm" : "text-gray-600 hover:bg-purple-50 hover:text-purple-800"}
                    `}
                  >
                    <div className="relative">
                      <Image src={isActive ? item.activeIcon : item.icon} alt={`${item.name} icon`} width={22} height={22} className={`mr-4 ${isActive ? "drop-shadow-md" : ""}`} />
                      {isActive && <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-2 h-8 rounded-r-full bg-gradient-to-b from-[#61008D] to-[#A31ABE]" />}
                    </div>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="absolute bottom-8 w-full px-8">
            <button
              onClick={logout}
              className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-3
                bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 
                hover:shadow-md transition-all duration-200 hover:from-purple-100 hover:to-purple-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
