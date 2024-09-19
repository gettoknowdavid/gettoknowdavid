import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "@/public/icon.png";

export type LogoProps = { variant?: "text" | "picture" };

export const Logo: React.FC<LogoProps> = ({ variant }) => {
  switch (variant) {
    case "picture":
      return (
        <Link href="/">
          <div className="invert dark:invert-0">
            <Image
              alt="David Michael II Logo"
              priority={true}
              sizes="(max-width: 768px) 50px, (max-width: 1200px) 85px, 85px"
              src={logo}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </Link>
      );
    case "text":
      return (
        <Link href="/">
          <h1 className="text-2xxl md:text-4xxl lg:text-7xl font-extralight leading-none">
            David Michael II
          </h1>
        </Link>
      );
    default:
      return <div>Error</div>;
  }
};
