"use client";

import { ROUTES } from "@/helpers/Constants";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Footer() {
  const router = useRouter();
  return (
    <footer className="flex items-center w-full border-t border-input rounded-t-lg h-16">
      <div className="px-6 py-6 flex justify-center w-full">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              {ROUTES.map((route, index) => (
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  key={index}
                  onClick={() => {
                    router.push(route.href);
                  }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>{route.icon}</TooltipTrigger>
                      <TooltipContent>
                        <p className="font-mono text-sm">{route.hoverText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </NavigationMenuLink>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </footer>
  );
}

export default Footer;
