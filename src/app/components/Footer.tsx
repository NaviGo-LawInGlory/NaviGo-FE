import React from "react";

const Footer = () => {
  return (
    <div
      className="w-full flex flex-row items-center justify-between h-24 px-24 text-white"
      style={{ background: "var(--gradient-dark-purple)" }}
    >
      <img src="/logo.png" alt="logo" className="h-12" />

      <h4 className="font-semibold bg-white bg-clip-text text-transparent">
        @2025 NaviGo
      </h4>

      <div className="flex flex-col items-end">
        <h4 className="font-semibold bg-white bg-clip-text text-transparent">
          Contact Us
        </h4>
        <div className="flex flex-row">
          <img src="/Footer/mail.png" alt="Mail icon" className="h-5" />
          <img src="/Footer/ig.png" alt="Instagram icon" className="h-5 ml-2" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
