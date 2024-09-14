import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "@/public/icon.png";

export const Logo: React.FC = () => {
  return (
    <div className="invert dark:invert-0">
      <Link href="/">
        <Image
          alt="David Michael II Logo"
          priority={true}
          sizes="(max-width: 768px) 50px, (max-width: 1200px) 85px, 85px"
          src={logo}
          style={{ width: "auto", height: "auto" }}
        />
      </Link>
    </div>
  );
};
