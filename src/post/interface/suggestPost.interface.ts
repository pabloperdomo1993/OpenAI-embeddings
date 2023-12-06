export interface SuggestPost {
    id?: number;
    message: string;
    createAt?: Date | string;
    vectorField: number[];
}