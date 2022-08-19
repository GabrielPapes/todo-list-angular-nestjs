export interface SubTodo {
    _id?: string;
    parentId: string;
    title: string;
    isDone: boolean;
}