import mongoose from "mongoose";

export class SubTodoDTO {
    todo: mongoose.Schema.Types.ObjectId;
    title: string;
    isDone: boolean;

}