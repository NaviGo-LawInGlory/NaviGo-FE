const Footer = () => {
  return (
    <div className="w-full flex flex-row items-center justify-between h-24 px-24 text-white" style={{ background: "var(--gradient-dark-purple)" }}>
      <img src="/logo.png" alt="logo" className="h-12" />

      <h4>@2025 NaviGo</h4>

      <div className="flex flex-col items-end">
        <h4>Contact Us</h4>
        <div className="flex flex-row">
          <img src="/Footer/mail.png" alt="" className="h-5" />
          <img src="/Footer/ig.png" alt="" className="h-5" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
