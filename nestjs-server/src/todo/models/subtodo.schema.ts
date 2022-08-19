import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { Todo } from "./todo.schema";


export type SubTodoDocument = Subtodo & Document;

@Schema()
export class Subtodo {
    _id: ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Todo'})
    todo: Todo;

    @Prop({required: true})
    title: string;

    @Prop({default: false})
    isDone: boolean;
}

export const SubtodoSchema = SchemaFactory.createForClass(Subtodo);