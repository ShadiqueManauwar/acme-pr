import { ZodError } from 'zod';
export declare function formatZodErrors(error: ZodError): {
    field: string;
    message: string | undefined;
} | null;
