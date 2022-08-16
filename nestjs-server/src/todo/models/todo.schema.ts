import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    _id: ObjectId;

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