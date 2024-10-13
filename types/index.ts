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
  sys: { id: string };
  title: string;
  slug: string;
  brief: string;
  description: string;
  tools: [string];
  featured: boolean;
  tags: [string];
  image: AssetT;
  links: WorkLinksCollection;
  images: ImagesCollection;
};

export type ImagesCollection = {
  total: number;
  skip: number;
  limit: number;
  items: AssetT[];
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

export type ShotT = {
  id: string;
  title: string;
  description: undefined;
  image: AssetT;
};

export type ShotsCollection = {
  total: number;
  skip: number;
  limit: number;
  shots: ShotT[];
};

export type BiographyT = {
  title: string;
  content: {
    json: any;
  };
};
