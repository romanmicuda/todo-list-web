import axios from 'axios';
import { z } from 'zod';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

export const todoSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().optional(),
    completed: z.boolean(),
    color: z.string().optional().nullable(),
});

export type Todo = z.infer<typeof todoSchema>;

export const createTodoSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    color: z.string().optional(),
});

export type CreateTodoDto = z.infer<typeof createTodoSchema>;

export const updateTodoSchema = createTodoSchema.partial();

export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;

export const getTodos = async (): Promise<Todo[]> => {
    const response = await api.get('/todo');
    return z.array(todoSchema).parse(response.data);
};

export const createTodo = async (todo: CreateTodoDto): Promise<Todo> => {
    const response = await api.post('/todo', todo);
    return todoSchema.parse(response.data);
};

export const updateTodo = async (id: number, todo: UpdateTodoDto): Promise<Todo> => {
    const response = await api.put(`/todo/${id}`, todo);
    return todoSchema.parse(response.data);
};

export const deleteTodo = async (id: number): Promise<void> => {
    await api.delete(`/todo/${id}`);
};
