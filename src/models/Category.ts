import { ISearchQuery } from "./Common/SearchQuery";

export interface ICategory {
    id: string;
    name: string;
    description: string;
    image: string;
    have_subcategories?: string;
    number_of_streams?: number;
}

export interface ICategorySearch extends ISearchQuery {
    name?: string;
}