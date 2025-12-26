import {IconWeight} from "@phosphor-icons/react";

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

export interface ProjectLinkT {
    sys: { id: string };
    type: string;
    link: string;
}

export interface ProjectLinksCollection {
    total: number;
    skip: number;
    limit: number;
    items: ProjectLinkT[];
}

export interface Project {
    sys: { id: string };
    featured: boolean;
    title: string;
    subtitle?: string;
    slug: string;
    brief: string;
    description: { json: any };
    keyFeatures: { json: any };
    tools: [string];
    startDate: string;
    endDate: string;
    tags: [string];
    client: string;
    role: string;
    liveUrl?: string;
    gitHubUrl?: string;
    linksCollection: ProjectLinksCollection;
    image?: AssetT;
    galleryCollection?: {
        total: number;
        skip: number;
        limit: number;
        items: AssetT[];
    };
}

export type ProjectItemT = Pick<Project, 'sys' | 'title' | 'brief' | 'slug' | 'tools'>

export interface Persona {
    sys: { id: string };
    isDefault: boolean;
    buttonLabel: string;
    body: { json: any }
}

export interface Hero {
    sys: { id: string };
    heading?: { json: any };
    enablePersonas: boolean;
    personasCollection: {
        total: number;
        skip: number;
        limit: number;
        items: Persona[];
    }
}

export interface HeroCollection {
    total: number;
    skip: number;
    limit: number;
    items: Hero[];
}