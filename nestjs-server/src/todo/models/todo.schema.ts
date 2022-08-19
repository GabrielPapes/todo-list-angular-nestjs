import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Subtodo } from './subtodo.schema';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    _id: ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Subtodo'})
    subtodos: Subtodo[];

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