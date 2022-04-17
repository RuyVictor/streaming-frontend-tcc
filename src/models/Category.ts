import { ISearchQuery } from "./Common/SearchQuery";

export interface ICategory {
    id: string;
    name: string;
    description: string;
    image: string;
    number_of_streams?: number;
}

export interface ICategorySearch extends ISearchQuery {
    name?: string;
}