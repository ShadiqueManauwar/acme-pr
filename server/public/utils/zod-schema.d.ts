import { z } from 'zod';
export declare const signupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createPostSchema: z.ZodObject<{
    title: z.ZodString;
    body: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    body: string;
}, {
    title: string;
    body: string;
}>;
export declare const commentOnPostSchema: z.ZodObject<{
    postId: z.ZodString;
    comment: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postId: string;
    comment: string;
}, {
    postId: string;
    comment: string;
}>;
export declare const replyOnCommentSchema: z.ZodObject<{
    reply: z.ZodString;
    commentId: z.ZodString;
    postId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postId: string;
    reply: string;
    commentId: string;
}, {
    postId: string;
    reply: string;
    commentId: string;
}>;
