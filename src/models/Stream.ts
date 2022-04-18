import { ISearchQuery } from "./Common/SearchQuery";
import { IUser } from "./User";

export interface IStream {
    id: string;
    title: string;
    description: string;
    status: string;
    spectators: number;
    url: string;
    user: IUser;
}

export interface IStreamSearch extends ISearchQuery {
    query?: string;
    status?: string;
    category?: string;
}