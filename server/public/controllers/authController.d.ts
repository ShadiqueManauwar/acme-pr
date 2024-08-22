import { type Response, type Request, type NextFunction } from 'express';
export declare function signup(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function signin(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function signOut(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
