import { z } from 'zod';

export const createTodoSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    completed: z.boolean().default(false).optional(),
    color: z.string().optional(),
});

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
