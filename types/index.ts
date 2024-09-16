import { IconWeight } from "@phosphor-icons/react";

export type AssetT = {
  url: string;
  alt: string;
};

export type WorkLinkT = {
  _id: string;
  type: string;
  link: string;
};

export type MainWorkLinkProps = {
  iconSize?: number | undefined;
  iconWeight?: IconWeight | undefined;
  textSize?: string | undefined;
  textWeight?: "light" | "regular" | "bold";
  gap?: string | undefined;
};

export type WorkLinksProps = MainWorkLinkProps & {
  links: WorkLinkT[];
  isVertical?: boolean;
};

export type WorkT = {
  id: string;
  title: string;
  slug: string;
  brief: string;
  description: string;
  tools: [string];
  image: AssetT;
  links: WorkLinksCollection;
};

export type WorkLinksCollection = {
  total: number;
  skip: number;
  limit: number;
  items: WorkLinkT[];
};

export type WorksCollection = {
  total: number;
  skip: number;
  limit: number;
  works: WorkT[];
};
