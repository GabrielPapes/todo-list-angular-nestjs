import mongoose from "mongoose";

export class TodoDTO {
    title: string;
    description: string;
    status: 'todo' | 'done' | 'progress';
    creationDate: Date;
    parentId?: string;
}