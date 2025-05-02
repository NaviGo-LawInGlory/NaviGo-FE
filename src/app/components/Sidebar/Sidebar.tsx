"use client";

import React, { useState } from "react";
import Link from "next/link";
import Style from "./Sidebar.module.css";

const menuItems = [
  {
    label: "Home",
    icon: "Ikon/homeIcon.svg",
    activeIcon: "IkonActive/homeActive.svg",
    href: "/navbarpage",
  },
  {
    label: "Document Generator",
    icon: "Ikon/documentIcon.svg",
    activeIcon: "IkonActive/documentActive.svg",
    href: "/documentgenerator",
  },
  {
    label: "Document Analyzer",
    icon: "Ikon/analyzerIcon.svg",
    activeIcon: "IkonActive/analyzerActive.svg",
    href: "/documentanalyzer",
  },
  {
    label: "AI Chat Bot",
    icon: "Ikon/chatbotIcon.svg",
    activeIcon: "IkonActive/chatbotActive.svg",
    href: "/aichatbot",
  },
  {
    label: "Find Lawyer",
    icon: "Ikon/lawyerIcon.svg",
    activeIcon: "IkonActive/lawyerActive.svg",
    href: "/findlawyer",
  },
  {
    label: "History",
    icon: "Ikon/historyIcon.svg",
    activeIcon: "IkonActive/historyActive.svg",
    href: "/history",
  },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <div className="h-auto w-[21%] shadow-2xl">
      <div className="flex items-center justify-center pt-12">
        <img src="Bar/logoNavigoHitam.svg" alt="Logo Navigo" />
      </div>
      <hr className="border-t border-[#707375] my-10 mx-5" />

      <ul className="flex flex-col -mt-5 text-[#3D3F40] font-semibold">
        {menuItems.map((item, index) => {
          const isActive = activeItem === item.label;

          return (
            <Link
              href={item.href}
              key={index}
              onClick={() => setActiveItem(item.label)}
              className={`
                flex items-center gap-3 h-[3.875rem] px-5 cursor-pointer
                ${Style.sidebar}
                ${
                  isActive
                    ? "bg-[#F0ECF8] border-l-[6px] border-[#A31ABE] text-[#A31ABE]"
                    : ""
                }
              `}
            >
              <img
                src={isActive ? item.activeIcon : item.icon}
                alt={`${item.label} Icon`}
                className="w-auto h-auto"
              />
              {item.label}
            </Link>
          );
        })}
        <div className="flex items-center justify-center mt-10">
          <button
            type="button"
            className="w-[80%] h-[2.5rem] bg-gradient-to-r from-[#A31ABE] to-[#E250CE] text-white  py-2 rounded-[10px] shadow-sm hover:bg-gradient-to-r from-[#a010bd] to-[#e22aca] transition"
          >
            Log Out
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;

