"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "../../../context/AuthContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/feature", label: "Feature" },
  { href: "/law", label: "Law" },
  { href: "/pricing", label: "Pricing" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { user, token, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav
      className="sticky top-0 z-30 flex items-center justify-between w-full p-3 md:p-5"
      style={{
        background: "linear-gradient(to right, #61008D 0%, #A31ABE 100%)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex items-center">
        <img src="Bar/logoNavigo.svg" alt="Logo Navigo" className="h-8 md:h-10" />

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="ml-4 md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors" aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <ul
        className={`
        md:flex justify-center gap-4 md:gap-6
        ${mobileMenuOpen ? "absolute top-full left-0 right-0 flex flex-col bg-purple-900 p-4 shadow-lg" : "hidden"}
      `}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href} className="relative py-2 md:py-0">
              <Link href={link.href} className={clsx("group text-white transition-colors font-medium relative px-3 md:px-4", isActive ? "font-semibold" : "text-white/80 hover:text-white")} onClick={() => setMobileMenuOpen(false)}>
                {link.label}
                <span className={clsx("absolute left-0 bottom-[-25px] h-[2px] w-full bg-white transform transition-transform duration-300 ease-out origin-center", isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        className={`
        flex gap-2 md:gap-4
        ${mobileMenuOpen && "md:hidden" ? "hidden" : "flex"}
      `}
      >
        {user && token ? (
          <>
            <Link href="/dashboard/me">
              <button className="bg-white text-purple-700 px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-gray-100 transition-colors shadow-md text-sm md:text-base font-medium">Dashboard</button>
            </Link>
            <button onClick={handleLogout} className="text-white border border-white/30 px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-white/10 transition-colors text-sm md:text-base font-medium">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="bg-white text-purple-700 px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-gray-100 transition-colors shadow-md text-sm md:text-base font-medium">Sign In</button>
            </Link>
            <Link href="/register">
              <button className="text-white border border-white/30 px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-white/10 transition-colors text-sm md:text-base font-medium">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
