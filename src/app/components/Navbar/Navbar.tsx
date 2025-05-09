"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "../../../context/AuthContext";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#features", label: "Feature" },
  { href: "#law", label: "Law" },
  { href: "#pricing", label: "Pricing" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { user, token, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setActiveSection(href);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.replace("#", ""));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const MobileNavbar = () => (
    <nav
      className="sticky top-0 z-30 w-full"
      style={{
        background: "linear-gradient(to right, #61008D 0%, #A31ABE 100%)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex items-center justify-between p-3">

        <img src="Bar/logoNavigo.svg" alt="Logo Navigo" className="h-8" />


        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-white hover:bg-white/10 transition-colors" aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>


      {mobileMenuOpen && (
        <div
          className="mt-1 pb-4 px-3 pt-2 border-t border-purple-400/30 animate-fadeIn"
          style={{
            background: "linear-gradient(to bottom, #61008D 0%, #A31ABE 100%)",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >

          <ul className="space-y-2 mb-5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href || (!activeSection && link.href === "#hero");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`block py-2.5 px-4 rounded-lg transition-all duration-200 ${isActive ? "bg-purple-300/20 text-white font-semibold border-l-4 border-white" : "text-white/90 hover:bg-purple-300/10"}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>


          <div className="mt-6 flex flex-col space-y-3 px-1">
            {user && token ? (
              <>
                <Link href="/dashboard/me" className="w-full">
                  <button className="w-full bg-white text-purple-700 py-2.5 px-5 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-200">Dashboard</button>
                </Link>
                <button onClick={handleLogout} className="w-full text-white border border-white/30 py-2.5 px-5 rounded-full hover:bg-white/10 transition-all duration-200">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="w-full">
                  <button className="w-full bg-white text-purple-700 py-2.5 px-5 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-200">Sign In</button>
                </Link>
                <Link href="/register" className="w-full">
                  <button className="w-full text-white border border-white/30 py-2.5 px-5 rounded-full hover:bg-white/10 transition-all duration-200">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );

  const DesktopNavbar = () => (
    <nav
      className="sticky top-0 z-30 flex items-center justify-between w-full p-5"
      style={{
        background: "linear-gradient(to right, #61008D 0%, #A31ABE 100%)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex items-center">
        <img src="Bar/logoNavigo.svg" alt="Logo Navigo" className="h-10" />
      </div>

      <ul className="flex justify-center gap-6">
        {navLinks.map((link) => {
          const isActive = activeSection === link.href || (!activeSection && link.href === "#hero");

          return (
            <li key={link.href} className="relative">
              <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className={clsx("group text-white transition-colors font-medium relative px-4", isActive ? "font-semibold" : "text-white/80 hover:text-white")}>
                {link.label}
                <span className={clsx("absolute left-0 bottom-[-25px] h-[2px] w-full bg-white transform transition-transform duration-300 ease-out origin-center", isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="flex gap-4">
        {user && token ? (
          <>
            <Link href="/dashboard/me">
              <button className="bg-white text-purple-700 px-5 py-2 rounded-full hover:bg-gray-100 transition-colors shadow-md text-base font-medium">Dashboard</button>
            </Link>
            <button onClick={handleLogout} className="text-white border border-white/30 px-5 py-2 rounded-full hover:bg-white/10 transition-colors text-base font-medium">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="bg-white text-purple-700 px-5 py-2 rounded-full hover:bg-gray-100 transition-colors shadow-md text-base font-medium">Sign In</button>
            </Link>
            <Link href="/register">
              <button className="text-white border border-white/30 px-5 py-2 rounded-full hover:bg-white/10 transition-colors text-base font-medium">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );

  return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
};

export default Navbar;

