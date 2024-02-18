"use client";
import { useTabContext } from "@/Contexts/Tabcontext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TABS } from "@/helpers/Constants";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function Footer() {
  const { handleTabChange } = useTabContext();
  return (
    <footer className="flex items-center w-full border-t border-input rounded-t-lg h-16">
      <div className="px-6 py-6 flex justify-center w-full">
        <Tabs defaultValue={TABS[0].hoverText} className="">
          <TabsList>
            {TABS.map((tab, index) => (
              <TabsTrigger
                value={tab.hoverText}
                onClick={() => {
                  handleTabChange(tab.hoverText);
                }}
                key={index}
              >
                <HoverCard>
                  <HoverCardTrigger>{tab.icon}</HoverCardTrigger>
                  <HoverCardContent>
                    <p className="font-mono text-sm">{tab.hoverText}</p>
                  </HoverCardContent>
                </HoverCard>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </footer>
  );
}

export default Footer;
