"use client";

import { ROUTES } from "@/helpers/Constants";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

function Footer() {
 
  return (
    <footer className="flex items-center w-full border-t border-input rounded-t-lg h-16">
      <div className="px-6 py-6 flex justify-center w-full">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              {ROUTES.map((route, index) => (
                <Link href={route.href} legacyBehavior passHref key={index}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {route.icon}
                  </NavigationMenuLink>
                </Link>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </footer>
  );
}

export default Footer;
