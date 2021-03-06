import { ICategory } from "./Category";
import { ISearchQuery } from "./Common/SearchQuery";
import { IUser } from "./User";

export interface IStream {
    id: string;
    title: string;
    description: string;
    status: string;
    spectators: number;
    url: string;
    category?: ICategory;
    user: IUser;
}

export interface IEditStreamDTO {
    title?: string;
    description?: string | null;
    category?: string;
}

export interface IStreamSearch extends ISearchQuery {
    query?: string;
    status?: string;
    category?: string;
}