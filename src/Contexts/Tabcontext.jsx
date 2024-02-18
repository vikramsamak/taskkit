"use client";
import { CALCULATOR } from "@/helpers/Constants";
import { createContext, useContext, useState } from "react";

const TabContext = createContext();

export const useTabContext = () => useContext(TabContext);

export const TabContextProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(CALCULATOR);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <TabContext.Provider value={{ selectedTab, handleTabChange }}>
      {children}
    </TabContext.Provider>
  );
};
