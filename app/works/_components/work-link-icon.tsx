import { IconWeight } from "@phosphor-icons/react";
import { GitBranch, Package, RssSimple } from "@phosphor-icons/react/dist/ssr";
import React from "react";

import { WorkLinkT } from "@/types";

export const WorkLinkIcon = ({
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
