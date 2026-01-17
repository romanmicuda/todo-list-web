import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from "./todo.entity";
import { Repository } from 'typeorm';
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) { }

    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    async findOne(id: number): Promise<Todo> {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return todo;
    }

    async remove(id: number): Promise<void> {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        await this.todoRepository.delete(id);
    }

    async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
        const todoToUpdate = await this.todoRepository.findOne({ where: { id } });
        if (!todoToUpdate) {
            throw new NotFoundException('Todo not found');
        }
        return await this.todoRepository.save({ ...todoToUpdate, ...updateTodoDto });
    }

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        console.log(createTodoDto);
        return await this.todoRepository.save(createTodoDto);
    }
}