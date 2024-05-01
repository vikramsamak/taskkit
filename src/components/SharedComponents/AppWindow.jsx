import React from "react";

function AppWindow({ children }) {
  return (
    <section className="flex flex-col gap-2 rounded-sm border border-input shadow-xl h-[500px] w-[600px]">
      {children}
    </section>
  );
}

export default AppWindow;
