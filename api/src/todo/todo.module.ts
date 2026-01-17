import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Todo } from "./todo.entity";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule { }