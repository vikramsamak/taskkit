import React from "react";
import ThemeSelector from "./ThemeSelector";

function Header() {
  return (
    <header className="flex items-center w-full border-b border-input rounded-b-lg h-16">
      <div className="py-6 px-6 flex justify-between w-full">
        <div className="flex items-center">
          <p className="font-mono">TOOLKIT</p>
        </div>
        <div>
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}

export default Header;
