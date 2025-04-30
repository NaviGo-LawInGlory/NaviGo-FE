"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Style from "./Navbar.module.css";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/feature", label: "Feature" },
  { href: "/law", label: "Law" },
  { href: "/pricing", label: "Pricing" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className={Style.navbar}>
      <div>
        <img src="/logoNavigo.svg" alt="Logo Navigo" />
      </div>

      <ul className="flex justify-center gap-[1.25rem]">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className={clsx(
                  "group text-white transition-colors font-semibold relative px-[2.5rem]",
                  isActive ? "font-semibold" : "text-gray-300"
                )}
              >
                {link.label}
                <span
                  className={clsx(
                    "absolute left-0 -bottom-[39px] h-[9px] w-full rounded-tl-[5px] rounded-tr-[5px] bg-white transform transition-transform duration-300 ease-out origin-center",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex gap-4">
        <Link href="/login">
          <button className="bg-[#FFFFFF] px-[22px] py-[10px] text-[#61008D] rounded-lg font-semibold cursor-pointer transition duration-300 hover:bg-[#BABEC1]">
            Sign In
          </button>

        </Link>
        <Link href="/register">
          <button className="bg-[#61008D] px-[22px] py-[10px] text-[#FFFFFF] rounded-lg font-semibold cursor-pointer transition duration-300 hover:bg-[#40025D]">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
