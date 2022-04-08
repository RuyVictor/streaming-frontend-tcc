export interface IPagination<T> {
    total?: string;
    perPage?: number;
    page?: number;
    lastPage?: number;
    data?: T;
}