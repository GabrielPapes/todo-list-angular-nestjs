import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { TodoDTO } from '../dto/todo.dto';
import { TodoService } from '../services/todo.service';

@Controller('todo')
export class TodoController {
    constructor(
        private todoService: TodoService
    ) {}

    @Get(':id')
    findById(@Param() { id }, @Res() res: Response) {
        this.todoService
            .findById(id)
            .then(todo => res.status(HttpStatus.OK).json(todo))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: err}))
    }
    
    @Get()
    findAll(@Res() res: Response) {
        this.todoService
            .findAll()
            .then(todos => res.status(HttpStatus.OK).json(todos))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: err}))
    }

    @Post()
    create(@Body() todoDTO: TodoDTO , @Res() res: Response) {
        this.todoService
            .create(todoDTO)
            .then(() => res.status(HttpStatus.CREATED).json({message: "TODO created!"}))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: err}))
    }

    @Put(':id')
    update(@Param() { id }, @Body() todoDTO: TodoDTO, @Res() res: Response) {
        console.log(id)
        this.todoService
            .update(id, todoDTO)
            .then(() => res.status(HttpStatus.OK).json({message: `TODO updated!`}))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: err}))
    }

    @Delete(':id')
    delete(@Param() { id }, @Res() res: Response) {
        this.todoService
        .delete(id)
        .then(() => res.status(HttpStatus.OK).json({message: `TODO deleted!`}))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: err}))
    }

}
