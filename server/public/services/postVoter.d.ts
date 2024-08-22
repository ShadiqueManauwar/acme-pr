export declare function addVote(postId: string, userId: string): Promise<"Vote retracted" | "Post upvoted">;
export declare function getTotalVotes(postId: string): Promise<number>;
