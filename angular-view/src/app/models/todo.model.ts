export interface Todo {
    _id?: string;
    title: string;
    description: string;
    creationDate: Date;
    parentId?: string;
    children?: [];
}