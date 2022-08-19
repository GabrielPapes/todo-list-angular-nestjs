import { Body, Controller, Delete, HttpStatus, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { SubTodoDTO } from '../dto/subtodo.dto';
import { SubtodoService } from '../services/subtodo.service';

@Controller('subtodo')
export class SubtodoController {
    logger = new Logger(SubtodoController.name);

    constructor(
        private subtodoService: SubtodoService
    ) { }

    @Post()
    create(@Body() subTodoDTO: SubTodoDTO, @Res() res: Response) {
        try {
            this.subtodoService
                .create(subTodoDTO)
                .then((todo) => res.status(HttpStatus.CREATED).json(todo))
                .catch(err => {
                    this.logger.error(err)
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
                })
        } catch (err) {
            console.log(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
        }

    }

    @Put(':id')
    update(@Param() { id }, @Body() subTodoDTO: SubTodoDTO, @Res() res: Response) {
        try {
            this.subtodoService
                .update(id, subTodoDTO)
                .then(() => res.status(HttpStatus.OK).json({ message: `SUBTODO updated!` }))
                .catch(err => {
                    this.logger.error(err)
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
                })
        } catch (err) {
            console.log(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
        }
    }

    @Delete(':id/:todoId')
    delete(@Param() { id, todoId }, @Res() res: Response) {
        try {
            this.subtodoService
                .delete(id, todoId)
                .then(() => res.status(HttpStatus.OK).json({ message: `SUBTODO deleted!` }))
                .catch(err => {
                    this.logger.error(err)
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
                })
        } catch (err) {
            console.log(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
        }

    }
}
