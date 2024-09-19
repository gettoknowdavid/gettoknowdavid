"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle as Hamburger,
} from "@nextui-org/navbar";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/logo";
import { NavItem } from "@/components/nav-item";

export const NavBar: React.FC = () => {
  const navItems = siteConfig.navItems;
  const currentPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      classNames={{
        base: "h-pad-2x border-foreground",
        wrapper: "max-w-full p-0 m-0",
        item: "flex uppercase text-xbase leading-none",
        menu: "w-auto m-pad px-0 pt-pad-x gap-6",
        menuItem: "leading-none p-0 uppercase text-sm",
      }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <Logo variant={"text"} />
      </NavbarBrand>
      <NavbarContent className="flex h-full items-end" justify={"end"}>
        <ul className="hidden lg:flex">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              hovered={hovered}
              i={index}
              isActive={currentPath === item.href}
              item={item}
              setHovered={setHovered}
            />
          ))}
        </ul>
      </NavbarContent>
      <NavbarContent className="lg:hidden" justify="end">
        <Hamburger aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
      <NavbarMenu>
        {navItems.map((item, index) => (
          <NavbarMenuItem key={index} isActive={currentPath === item.href}>
            <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
