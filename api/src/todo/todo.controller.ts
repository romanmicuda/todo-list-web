import { Controller, Get, Param, Post, Put, Delete, Body, UsePipes } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Todo } from "./todo.entity";
import { createTodoSchema } from "./dto/create-todo.dto";
import type { CreateTodoDto } from "./dto/create-todo.dto";
import { updateTodoSchema } from "./dto/update-todo.dto";
import type { UpdateTodoDto } from "./dto/update-todo.dto";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";


@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    async findAll(): Promise<Todo[]> {
        return await this.todoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Todo> {
        return await this.todoService.findOne(id);
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createTodoSchema))
    async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return await this.todoService.create(createTodoDto);
    }

    @Put(':id')
    @UsePipes(new ZodValidationPipe(updateTodoSchema))
    async update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
        return await this.todoService.update(id, updateTodoDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        await this.todoService.remove(id);
    }
}