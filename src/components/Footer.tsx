import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-center text-gray-400 py-6">
      <div className="max-w-[1400px] mx-auto">
        © {new Date().getFullYear()} Movie Rate
      </div>
    </footer>
  );
};

export default Footer;
