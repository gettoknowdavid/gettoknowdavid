"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/logo";

export const NavBar: React.FC = () => {
  const navItems = siteConfig.navItems;
  const currentPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const openMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <Navbar
      classNames={{
        base: "w-auto h-pad p-0 bg-transparent fixed left-pad right-pad top-pad z-[900]",
        wrapper: "max-w-full h-pad p-0 m-0",
        brand: "mix-blend-difference invert-1",
        menu: "p-0 bg-background/[0.9] py-pad-2x md:py-pad-x",
        menuItem: [
          "text-md leading-none p-0 uppercase text-right",
          "group transition-all-450 ",
        ],
      }}
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <Logo variant="text" />
      </NavbarBrand>
      <NavbarContent className="hidden md:flex" justify="center">
        <ThemeSwitch />
      </NavbarContent>
      <NavbarContent justify="end">
        <button
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-md transition-all-450"
          onClick={openMenu}
        >
          {isMenuOpen ? "CLOSE" : "MENU"}
        </button>
      </NavbarContent>
      <NavbarMenu onClick={closeMenu}>
        <div className="p-pad relative flex justify-end">
          <ul className="grid gap-6 justify-end z-50 w-auto">
            {navItems.map((item, index) => (
              <NavbarMenuItem
                key={index}
                className={`${hoveredIndex === null || hoveredIndex === index ? "opacity-100" : "opacity-30"}`}
                isActive={currentPath === item.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={item.href}>{item.label}</Link>
              </NavbarMenuItem>
            ))}
          </ul>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};
