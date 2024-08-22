import { type Response, type Request, type NextFunction } from 'express';
export declare function createPost(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getPost(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getAllPosts(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getUserPosts(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function voteAPost(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function commentOnPost(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function replyOnComment(req: Request, res: Response, next: NextFunction): Promise<void>;
