export interface IStream {
    id: string;
    name: string;
    description: string;
    finished: boolean;
    expires_at: string;
    priority: 'low' | 'normal' | 'high' | any;
}