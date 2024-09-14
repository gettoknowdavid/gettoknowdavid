import React from "react";

import { NavList } from "@/components/nav-list";
import { Logo } from "@/components/logo";

export const MobileHeader: React.FC = () => {
  return (
    <header className="absolute z-10 top-pad right-pad p-pad flex lg:hidden flex-col gap-8">
      <Logo />
      <NavList />
    </header>
  );
};
