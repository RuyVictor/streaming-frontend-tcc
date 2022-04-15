import { ISearchQuery } from "./Common/SearchQuery";

export interface ICategory {
    id: string;
    name: string;
    description: string;
    image: string;
    status: 'active' | 'inactive';
    spectators?: number;
    created_at: string;
    updated_at: string;
}

export interface ICategorySearch extends ISearchQuery {
    name?: string;
}