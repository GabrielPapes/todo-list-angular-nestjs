import mongoose from "mongoose";

export class TodoDTO {
    title: string;
    description: string;
    creationDate: Date;
    parentId?: string | undefined;
}