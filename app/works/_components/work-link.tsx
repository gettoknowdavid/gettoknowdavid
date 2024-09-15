import React from "react";
import {
  GitBranch,
  IconWeight,
  Package,
  RssSimple,
} from "@phosphor-icons/react";

import { WorkLinkProps, WorkLinksProps, WorkLinkT } from "@/types";

export const WorkLinks: React.FC<WorkLinksProps> = ({
  links,
  isVertical = false,
  iconSize,
  iconWeight,
  textSize = "text-xs lg:text-sm",
  textWeight = "regular",
  gap = 1.5,
}) => {
  return (
    <ul
      className={`flex ${isVertical ? `flex-col gap-9` : `flex-row gap-4`} md:pb-1 lg:pb-1.5`}
    >
      {links.map((link) => (
        <li key={link._id}>
          <a
            className={`flex flex-row gap-${gap} items-center text-primary-600 transition-opacity hover:opacity-30`}
            href={link.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            {getLinkIcon({ link, size: iconSize, weight: iconWeight })}
            <small className={`${textSize} font-${textWeight}`}>
              {link.type}
            </small>
          </a>
        </li>
      ))}
    </ul>
  );
};
export const WorkLink: React.FC<WorkLinkProps> = ({
  link,
  iconSize,
  iconWeight,
  textSize = "text-xs lg:text-sm",
  textWeight = "regular",
  gap = 1.5,
}) => {
  return (
    <li>
      <a
        className={`flex flex-row gap-${gap} items-center text-primary-600 transition-opacity hover:opacity-30`}
        href={link.link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {getLinkIcon({ link, size: iconSize, weight: iconWeight })}
        <small className={`${textSize} font-${textWeight}`}>{link.type}</small>
      </a>
    </li>
  );
};

const getLinkIcon = ({
  link,
  size = 14,
  weight = "regular",
}: {
  link: WorkLinkT;
  size?: number;
  weight?: IconWeight | undefined;
}) => {
  switch (link.type) {
    case "Live":
      return <RssSimple size={size} weight={weight} />;
    case "Package":
      return <Package size={size} weight={weight} />;
    case "Code":
      return <GitBranch size={size} weight={weight} />;
    default:
      return <div>Nothing</div>;
  }
};
