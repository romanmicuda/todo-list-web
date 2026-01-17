import { createTodoSchema } from './create-todo.dto';
import { z } from 'zod';

export const updateTodoSchema = createTodoSchema.partial();

export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
