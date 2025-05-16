"use client";

import React from "react";
import {
  At,
  DiscordLogo,
  GithubLogo,
  LinkedinLogo,
  ReadCvLogo,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const socials = siteConfig.socials;
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <ul className={`grid grid-rows-${socials.length} w-full`}>
      {socials.map((social, index) => (
        <motion.li
          key={index}
          animate={{
            opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.3,
          }}
          className="py-3 cursor-pointer"
          transition={{ ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          onHoverEnd={() => setHoveredIndex(null)}
          onHoverStart={() => setHoveredIndex(index)}
        >
          <a href={social.url} rel="noopener noreferrer" target="_blank">
            <div className="grid grid-cols-2 gap-1 relative">
              <div className="grid col-span-1 items-center justify-start">
                <h1 className="text-3xl font-light">{social.name}</h1>
              </div>
              <div className="flex items-center h-full text-5xl justify-end">
                {getSocialIcon({ name: social.name })}
              </div>
            </div>
          </a>
        </motion.li>
      ))}
    </ul>
  );
}

function getSocialIcon({ name }: { name: string }) {
  switch (name) {
    case "Email":
      return <At />;
    case "WhatsApp":
      return <WhatsappLogo />;
    case "Resume":
      return <ReadCvLogo />;
    case "GitHub":
      return <GithubLogo />;
    case "LinkedIn":
      return <LinkedinLogo />;
    case "X":
      return <XLogo />;
    // case "Instagram":
    //   return <InstagramLogo />;
    default:
      return <DiscordLogo />;
  }
}
