export type AssetT = {
    url: string;
    alt: string;
};

export type ImagesCollection = {
    total: number;
    skip: number;
    limit: number;
    items: AssetT[];
};


export interface Shot {
    sys: { id: string };
    title: string;
    description: undefined;
    image: {
        url: string;
        alt: string;
        height: number;
        width: number;
    };
}

export type ShotsCollection = {
    total: number;
    skip: number;
    limit: number;
    shots: ShotT[];
};

export interface WorkLinkT {
    sys: { id: string };
    type: string;
    link: string;
}

export interface WorkLinksCollection {
    total: number;
    skip: number;
    limit: number;
    items: WorkLinkT[];
}

export interface Work {
    sys: { id: string };
    featured: boolean;
    title: string;
    subtitle?: string;
    slug: string;
    brief: string;
    description: { json: any };
    keyFeatures: { json: any };
    tools: [string];
    toolsShort: [string];
    startDate: string;
    endDate: string;
    tags: [string];
    client: string;
    role: string;
    liveUrl?: string;
    gitHubUrl?: string;
    linksCollection: WorkLinksCollection;
    image?: AssetT;
    galleryCollection?: {
        total: number;
        skip: number;
        limit: number;
        items: AssetT[];
    };
}

export type WorkItemT = Pick<Work, 'sys' | 'title' | 'brief' | 'slug' | 'toolsShort' | 'role' | 'startDate' | 'endDate' | 'client'>

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

export interface Reference {
    sys: { id: string };
    refereeName: string;
    refereeRole: string;
    refereeLink: string;
    content: string;
}

export interface ReferenceCollection {
    total: number;
    skip: number;
    limit: number;
    items: Reference[];
}

export interface FetchOptions {
    revalidate?: number | false;
    tags?: string[];
}


interface ContentfulResponse<T> {
    data: T;
    errors?: Array<{ message: string }>;
}
