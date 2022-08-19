import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { SubTodoDTO } from '../dto/subtodo.dto';
import { TodoService } from '../services/todo.service';
import mongoose, { ObjectId } from 'mongoose';


@Controller('subtodo')
export class SubtodoController {
    constructor(
        private todoService: TodoService
    ) {}

    @Post()
    create(@Body() subtodoDTO: SubTodoDTO , @Res() res: Response) {
        try {
            this.todoService
                .createSubtodo(subtodoDTO)
                .then((todo) => res.status(HttpStatus.CREATED).json(todo))
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: err}))
        } catch (err) {
            console.log(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: err});
        }
        
    }

    @Put(':id')
    update(@Param() { id }, @Body() subtodoDTO: SubTodoDTO, @Res() res: Response) {
        try {
            this.todoService
                .updateSubtodo(id, subtodoDTO)
                .then(() => res.status(HttpStatus.OK).json({message: `SUBTODO updated!`}))
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: err}))
        } catch (err) {
            console.log(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: err});
        }
    }

    @Delete(':id')
    delete(@Param() { id }, @Res() res: Response) {
        try {
            this.todoService
                .deleteSubtodo(id)
                .then(() => res.status(HttpStatus.OK).json({message: `SUBTODO deleted!`}))
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: err}))
        } catch (err) {
            console.log(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: err});
        }

    }




}
