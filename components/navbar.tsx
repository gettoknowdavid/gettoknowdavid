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
import { Divider } from "@nextui-org/divider";

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/logo";
import { NavItem } from "@/components/nav-item";
import { ThemeSwitch } from "@/components/theme-switch";

export const NavBar: React.FC = () => {
  const navItems = siteConfig.navItems;
  const currentPath = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [isShrunk, setShrunk] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShrunk(true);
      } else {
        setShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar
        isBordered
        classNames={{
          base: [
            "fixed",
            "py-1.5",
            "flex items-center lg:items-end",
            isShrunk ? "h-pad-2x" : "h-pad-4x md:h-pad-3x lg:h-pad-4x",
            "transition-all duration-700 ease-in-out",
            "border-primary-400 bg-background/[.1]",
          ],
          wrapper: "max-w-full px-pad m-0",
          item: "flex uppercase text-xbase leading-none",
          menu: "w-auto p-pad pt-pad-x gap-6",
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
          <Divider className="my-4" />

          <ThemeSwitch isVertical />
        </NavbarMenu>
      </Navbar>
      <div
        className={`fixed right-pad hidden lg:flex my-2 mx-0 ${isShrunk ? "top-pad-2x" : "top-pad-4x md:top-pad-3x lg:top-pad-4x"} transition-all duration-700 ease-in-out`}
      >
        <ThemeSwitch />
      </div>
    </>
  );
};
