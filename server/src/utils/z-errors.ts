import { ZodError } from 'zod';

export function formatZodErrors(error: ZodError) {
  const zErr = error.flatten().fieldErrors;

  for (const field in zErr) {
    if (zErr[field]) {
      return { field, message: zErr[field]?.at(0) };
    }
  }

  return null;
}
