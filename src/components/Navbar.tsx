import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-gray-100">
      <div className="max-w-[1400px] mx-auto p-4 flex items-center justify-between">
        <div className="text-lg font-bold">Movie Rate</div>
        <div className="flex items-center gap-4">
          <a className="text-gray-300 hover:text-white">Home</a>
          <a className="text-gray-300 hover:text-white">Rated</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
