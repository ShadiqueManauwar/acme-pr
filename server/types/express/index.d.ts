import 'express';

export type User = {
  userId: string | null;
  name: string | null;
  role: 'admin' | 'supervisor' | 'user' | null;

  email: string | null;
};

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
