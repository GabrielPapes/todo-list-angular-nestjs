import mongoose from "mongoose";

export class SubTodoDTO {
    _id: mongoose.Types.ObjectId;
    todoId: mongoose.Schema.Types.ObjectId;
    title: string;
    isDone: boolean;
}