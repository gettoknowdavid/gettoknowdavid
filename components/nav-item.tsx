import React from "react";
import Link from "next/link";
import { NavbarItem } from "@nextui-org/navbar";
import { motion } from "framer-motion";

export type NavItemProps = {
  isActive: boolean;
  item: { href: string; label: string };
  i: number;
  hovered: number | null;
  setHovered: (value: number | null) => void;
};

export const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  const { i, item, isActive, hovered, setHovered } = props;

  return (
    <motion.div
      animate={{ opacity: hovered !== i && hovered !== null ? 0.2 : 1 }}
      className="cursor-pointer group leading-none p-0 m-0"
      onHoverEnd={() => setHovered(null)}
      onHoverStart={() => setHovered(i)}
    >
      <NavbarItem isActive={isActive}>
        <Link href={item.href}>
          {i !== 0 && <span className="mx-2 group-hover:opacity-20">/</span>}
          {item.label}
        </Link>
      </NavbarItem>
    </motion.div>
  );
};
