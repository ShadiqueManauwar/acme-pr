import { type Response, type Request, type NextFunction } from 'express';
export declare function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
