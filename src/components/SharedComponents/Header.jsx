import React from "react";
import ThemeSelector from "./ThemeSelector";
import UserDropDown from "../User/UserDropDown";

function Header() {
  return (
    <header className="flex items-center w-full border-b border-input rounded-b-lg">
      <div className="py-2 px-2 flex justify-between w-full">
        <div className="flex items-center">
          <p className="font-mono tracking-widest">TASKKIT</p>
        </div>
        <div className="inline-flex gap-4 items-center">
          <ThemeSelector />
          <UserDropDown />
        </div>
      </div>
    </header>
  );
}

export default Header;
