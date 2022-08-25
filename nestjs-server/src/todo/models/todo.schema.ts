import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { TodoDTO } from '../dto/todo.dto';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    _id: ObjectId;

    @Prop({type: mongoose.Types.ObjectId, ref: 'Todo',default: []})
    parentId: mongoose.Types.ObjectId;

    @Prop([{type: mongoose.Types.ObjectId, ref: 'Todo',default: []}])
    children: Array<mongoose.Types.ObjectId>;

    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({type: String, enum: ['todo', 'done', 'progress'], default: 'todo'})
    status: string;

    @Prop()
    creationDate: Date;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;
 
}

export const TodoSchema = SchemaFactory.createForClass(Todo);