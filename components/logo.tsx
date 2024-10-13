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
              sizes="(max-width: 768px) 36px, (max-width: 1200px) 42px, 42px"
              src={logo}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </Link>
      );
    case "text":
      return (
        <Link
          className="text-xl xl:text-2xl uppercase leading-none text-foreground mix-blend-difference"
          href="/"
        >
          David Michael II
        </Link>
      );
    default:
      return <div>Error</div>;
  }
};
