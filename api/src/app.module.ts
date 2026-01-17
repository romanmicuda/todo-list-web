import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todolist',
      synchronize: true,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }
  ), TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
