"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
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

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>

      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white z-50 
          w-[260px] md:w-[280px] lg:w-[300px]
          transition-all duration-300 ease-in-out
          shadow-[5px_0_25px_-15px_rgba(0,0,0,0.15)]
          overflow-y-auto pt-6 md:pt-4
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="px-4 md:px-6 py-6 md:py-8 flex justify-center">
          <Link href="/" className="flex items-center">
            <Image src="/Sidebar/sidebar_logo_black.png" alt="NaviGo Logo" width={100} height={70} priority className="w-[100px] md:w-[120px] h-auto" />
          </Link>
        </div>

        <div className="flex justify-center my-4 md:my-6">
          <div className="w-[85%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        <nav className="px-0 pb-20">
          <ul className="space-y-1 md:space-y-2 mt-4 md:mt-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name} className="relative mx-2 md:mx-4">
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 md:px-5 py-3 md:py-4 text-sm
                      rounded-xl transition-all duration-200
                      ${isActive ? "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-900 font-medium shadow-sm" : "text-gray-600 hover:bg-purple-50 hover:text-purple-800"}
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="relative">
                      <Image src={isActive ? item.activeIcon : item.icon} alt={`${item.name} icon`} width={20} height={20} className={`mr-3 md:mr-4 ${isActive ? "drop-shadow-md" : ""}`} />
                      {isActive && <div className="absolute -left-4 md:-left-5 top-1/2 -translate-y-1/2 w-1.5 md:w-2 h-6 md:h-8 rounded-r-full bg-gradient-to-b from-[#61008D] to-[#A31ABE]" />}
                    </div>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="fixed bottom-4 md:bottom-8 w-full px-4 md:px-8 max-w-[260px] md:max-w-[280px] lg:max-w-[300px]">
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 md:py-3 px-4 rounded-xl flex items-center justify-center gap-2 md:gap-3
                bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 
                hover:shadow-md transition-all duration-200 hover:from-purple-100 hover:to-purple-200
                text-sm md:text-base"
            >
              <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

