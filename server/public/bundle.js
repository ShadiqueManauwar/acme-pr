(()=>{"use strict";var e={353:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.db=void 0;const n=o(330);t.db=new n.PrismaClient},150:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(r,s){function i(e){try{a(n.next(e))}catch(e){s(e)}}function d(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,d)}a((n=n.apply(e,t||[])).next())}))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.signup=function(e,t,o){return n(this,void 0,void 0,(function*(){var n,r,i,u,l,f;const p=yield e.body;try{const e=c.signupSchema.safeParse(p);if(!e.success){const t=e.error.flatten();throw new Error((null===(r=null===(n=t.fieldErrors)||void 0===n?void 0:n.email)||void 0===r?void 0:r.at(0))||(null===(u=null===(i=t.fieldErrors)||void 0===i?void 0:i.name)||void 0===u?void 0:u.at(0))||(null===(f=null===(l=t.fieldErrors)||void 0===l?void 0:l.password)||void 0===f?void 0:f.at(0)))}const{password:o,email:h,name:m}=e.data,v=yield(0,d.genHash)(o);if(yield a.db.user.findFirst({where:{email:h}}))throw new Error("Account Exsists for this email");const y=process.env.JWT_SECRET;if(!y)throw new Error("Secret not found");const w=yield a.db.user.create({data:{email:h,name:m.toLowerCase(),password:v}});if(!w)throw new Error("Could not create user");const g=yield s.default.sign({userId:w.id,name:w.name.toLowerCase(),email:w.email},y,{expiresIn:"24h"});return(yield a.db.revokedTokens.findFirst({where:{token:g}}))&&(yield a.db.revokedTokens.delete({where:{token:g}})),t.status(201).json({token:g})}catch(e){o(e)}}))},t.signin=function(e,t,o){return n(this,void 0,void 0,(function*(){const n=yield e.body;console.log("Logging in");try{const e=c.signinSchema.safeParse(n);if(!e.success)throw new Error("Invalid Credentials");const{password:o,email:r}=e.data,i=yield a.db.user.findFirst({where:{email:r}});if(!i)throw new Error("User not found");if(console.log({password:o,email:r,user:i}),!(yield(0,u.compare)(o,i.password)))throw new Error("Invalid Pasword");const d=process.env.JWT_SECRET;if(!d)throw new Error("Secret not found");const l=yield s.default.sign({userId:i.id,name:i.name,email:i.email},d,{expiresIn:"24h"});return(yield a.db.revokedTokens.findFirst({where:{token:l}}))&&(yield a.db.revokedTokens.delete({where:{token:l}})),t.status(200).json({token:l})}catch(e){o(e)}}))},t.signOut=function(e,t,o){return n(this,void 0,void 0,(function*(){var n;try{console.log("[Signing out]");const o=null===(n=e.headers.authorization)||void 0===n?void 0:n.split(" ")[1];return o&&(yield a.db.revokedTokens.create({data:{token:o}})),t.clearCookie("access_token",{path:"/"}).status(200).json({message:"singout success"})}catch(e){o(e)}}))};const s=r(o(829)),i=r(o(818)),d=o(118),a=o(353),u=o(729),c=o(391);i.default.config()},793:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(r,s){function i(e){try{a(n.next(e))}catch(e){s(e)}}function d(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,d)}a((n=n.apply(e,t||[])).next())}))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.createPost=function(e,t,o){return n(this,void 0,void 0,(function*(){const n=yield e.body,r=yield e.user;try{if(!r||!r.userId)return t.status(403);const e=d.createPostSchema.parse(n),o=yield i.db.$transaction([i.db.post.create({data:{title:e.title,body:e.body,authorId:r.userId}}),i.db.scores.upsert({where:{userId:r.userId},create:{userId:r.userId,score:f},update:{score:{increment:f}}})]);if(!o)throw new Error("Could not create post");return t.status(201).json({postId:o[0].id})}catch(e){o(e)}}))},t.getPost=function(e,t,o){return n(this,void 0,void 0,(function*(){const n=e.user;try{if(!n||!n.userId)return t.status(403);const{postId:o}=a.z.object({postId:a.z.string()}).parse(e.params),r=yield i.db.post.findFirst({where:{id:o},include:{author:{select:{email:!0,id:!0,name:!0}},comments:{orderBy:{updatedAt:"desc"},include:{author:{select:{email:!0,id:!0,name:!0}},replies:{orderBy:{updatedAt:"desc"},include:{author:{select:{email:!0,id:!0,name:!0}}}}}},upvote:!0}});if(!r)throw new Error("Post not found");const s=r.upvote.reduce(((e,t)=>e+t.value),0);return t.status(200).json({post:Object.assign(Object.assign({},r),{totalVotes:s})})}catch(e){o(e)}}))},t.getAllPosts=function(e,t,o){return n(this,void 0,void 0,(function*(){const n=e.user;try{if(!n||!n.userId)throw console.log("lo"),new Error("Please login ");const e=(yield i.db.post.findMany({orderBy:{updatedAt:"desc"},include:{author:!0,comments:{orderBy:{updatedAt:"desc"}},upvote:!0}})).map((e=>{const t=e.upvote.reduce(((e,t)=>e+t.value),0);return Object.assign(Object.assign({},e),{totalVotes:t})}));return t.status(200).json({posts:e})}catch(e){o(e)}}))},t.getUserPosts=function(e,t,o){return n(this,void 0,void 0,(function*(){const n=e.user;try{if(!n||!n.userId)throw console.log("lo"),new Error("Please login ");const e=(yield i.db.post.findMany({orderBy:{updatedAt:"desc"},include:{author:!0,comments:{orderBy:{updatedAt:"desc"}},upvote:!0},where:{authorId:n.userId}})).map((e=>{const t=e.upvote.reduce(((e,t)=>e+t.value),0);return Object.assign(Object.assign({},e),{totalVotes:t})}));return t.status(200).json({posts:e})}catch(e){o(e)}}))},t.voteAPost=function(e,t,o){return n(this,void 0,void 0,(function*(){const n=e.user;try{const o=a.z.object({postId:a.z.string()}).parse(yield e.body);if(!n||!n.userId)throw console.log("Please Login"),new Error("Please login ");const r=yield(0,u.addVote)(o.postId,n.userId);return t.status(200).json({message:r})}catch(e){o(e)}}))},t.commentOnPost=function(e,t,o){return n(this,void 0,void 0,(function*(){const n=e.user;try{if(!n||!(null==n?void 0:n.userId))throw new Error("Login to comment");const{comment:o,postId:r}=d.commentOnPostSchema.parse(yield e.body),s=yield i.db.post.findFirstOrThrow({where:{id:r}}),a=yield i.db.$transaction([i.db.scores.upsert({where:{userId:n.userId},update:{score:{increment:l}},create:{userId:n.userId,score:l}}),i.db.scores.update({where:{userId:s.authorId},data:{score:{increment:c}}}),i.db.comment.create({data:{comment:o,postId:r,authorId:n.userId}})]);t.status(201).json({comment:a})}catch(e){o(e)}}))},t.replyOnComment=function(e,t,o){return n(this,void 0,void 0,(function*(){const n=e.user;try{if(!n||!(null==n?void 0:n.userId))throw new Error("Login to Reply");const{commentId:o,reply:r,postId:s}=d.replyOnCommentSchema.parse(yield e.body),a=yield i.db.comment.create({data:{comment:r,parentId:o,postId:s,authorId:n.userId}});t.status(201).json({reply:a})}catch(e){o(e)}}))};const s=r(o(818)),i=o(353),d=o(391),a=o(569),u=o(445),c=5,l=3;s.default.config();const f=10},291:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(r,s){function i(e){try{a(n.next(e))}catch(e){s(e)}}function d(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,d)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getProfileInfo=function(e,t,o){return n(this,void 0,void 0,(function*(){try{const{username:o}=s.z.object({username:s.z.string().max(256).regex(/^\S*$/,"Username must not contain spaces")}).parse(e.params),n=yield r.db.user.findFirst({where:{name:o},select:{email:!0,id:!0,name:!0,score:!0}});return t.status(200).json({profileInfo:n})}catch(e){o(e)}}))};const r=o(353),s=o(569)},232:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(o(252));o(469);const s=n(o(268)),i=n(o(525)),d=n(o(96)),a=n(o(577)),u=(0,r.default)(),c=process.env.PORT||8e3,l=n(o(89)),f=n(o(540)),p=n(o(550)),h=o(560),m=o(541),v=o(569),y=o(34);u.use(s.default.json()),u.use((0,i.default)()),u.use((0,d.default)("combined")),u.use(s.default.urlencoded({extended:!0}));const w=process.env.APP_URL;console.log(w),u.use((0,a.default)({origin:w,credentials:!0})),u.get("/api/hello",((e,t)=>{t.send("hello world")})),u.use("/api/",l.default),u.use("/api/posts/",h.authenticateToken,f.default),u.use("/api/profile/",p.default),u.use(((e,t,o,n)=>{var r;let s=500,i=e.message;if(e instanceof m.PrismaClientKnownRequestError)"P2002"===e.code&&(s=400,i=((null===(r=e.meta)||void 0===r?void 0:r.target)||"unknown").split("_").at(-2)+" already exsits",console.log({err:e,meta:e.meta}));else if(e instanceof v.ZodError){const t=(0,y.formatZodErrors)(e);i=(null==t?void 0:t.message)||"Invalid Data Provided"}console.error({errorType:e.constructor.name,errorMessage:i,stack:e.stack}),o.status(s).json({message:i})})),u.listen(Number(c),(()=>{console.log(`App listening at ${c}`)}))},89:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(252),r=o(150),s=(0,n.Router)();s.post("/signin",r.signin),s.post("/signout",r.signOut),s.post("/signup",r.signup),t.default=s},540:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(793),r=(0,o(252).Router)();r.get("/",n.getAllPosts),r.get("/user-posts",n.getUserPosts),r.get("/:postId",n.getPost),r.post("/create",n.createPost),r.post("/vote",n.voteAPost),r.post("/comment",n.commentOnPost),r.post("/comment/reply",n.replyOnComment),t.default=r},550:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(291),r=(0,o(252).Router)();r.get("/:username",n.getProfileInfo),t.default=r},560:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(r,s){function i(e){try{a(n.next(e))}catch(e){s(e)}}function d(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,d)}a((n=n.apply(e,t||[])).next())}))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.authenticateToken=function(e,t,o){return n(this,void 0,void 0,(function*(){try{const n=e.headers.authorization;if(!n)return t.sendStatus(401);const r=yield i.db.revokedTokens.findFirst({where:{token:n}});if((null==r?void 0:r.token)===n)throw new Error("Token expired");try{const t=process.env.JWT_SECRET;if(!t)throw new Error("Secret not found");const r=s.default.verify(n,t);e.user=r,console.log("Access granted"),o()}catch(e){return t.sendStatus(403)}}catch(e){o(e)}}))};const s=r(o(829)),i=o(353)},118:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(r,s){function i(e){try{a(n.next(e))}catch(e){s(e)}}function d(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,d)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.genHash=function(e){return n(this,void 0,void 0,(function*(){const t=yield(0,r.genSalt)(10);return yield(0,r.hash)(e,t)}))};const r=o(729)},445:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(r,s){function i(e){try{a(n.next(e))}catch(e){s(e)}}function d(e){try{a(n.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(i,d)}a((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.addVote=function(e,t){return n(this,void 0,void 0,(function*(){const o=yield r.db.upvote.findUnique({where:{postId_userId:{postId:e,userId:t}}});if(o){const t=yield r.db.post.findFirstOrThrow({where:{id:e}});return yield r.db.$transaction([r.db.upvote.delete({where:{id:o.id}}),r.db.scores.update({where:{userId:null==t?void 0:t.authorId},data:{score:{decrement:i}}})]),"Vote retracted"}{const o=yield r.db.post.findFirstOrThrow({where:{id:e}});return yield r.db.$transaction([r.db.upvote.create({data:{value:s,postId:e,userId:t}}),r.db.scores.update({where:{userId:null==o?void 0:o.authorId},data:{score:{increment:i}}})]),"Post upvoted"}}))},t.getTotalVotes=function(e){return n(this,void 0,void 0,(function*(){return(yield r.db.upvote.aggregate({_sum:{value:!0},where:{postId:e}}))._sum.value||0}))};const r=o(353),s=1,i=2},34:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.formatZodErrors=function(e){var t;const o=e.flatten().fieldErrors;for(const e in o)if(o[e])return{field:e,message:null===(t=o[e])||void 0===t?void 0:t.at(0)};return null}},391:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.replyOnCommentSchema=t.commentOnPostSchema=t.createPostSchema=t.signinSchema=t.signupSchema=void 0;const n=o(569);t.signupSchema=n.z.object({email:n.z.string().email(),password:n.z.string().min(6),name:n.z.string().max(256).regex(/^\S*$/,"Username must not contain spaces")}),t.signinSchema=n.z.object({email:n.z.string().email(),password:n.z.string()}),t.createPostSchema=n.z.object({title:n.z.string(),body:n.z.string()}),t.commentOnPostSchema=n.z.object({postId:n.z.string(),comment:n.z.string()}),t.replyOnCommentSchema=n.z.object({reply:n.z.string(),commentId:n.z.string(),postId:n.z.string()})},330:e=>{e.exports=require("@prisma/client")},541:e=>{e.exports=require("@prisma/client/runtime/library")},729:e=>{e.exports=require("bcryptjs")},268:e=>{e.exports=require("body-parser")},577:e=>{e.exports=require("cors")},818:e=>{e.exports=require("dotenv")},469:e=>{e.exports=require("dotenv/config")},252:e=>{e.exports=require("express")},525:e=>{e.exports=require("helmet")},829:e=>{e.exports=require("jsonwebtoken")},96:e=>{e.exports=require("morgan")},569:e=>{e.exports=require("zod")}},t={};!function o(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,o),s.exports}(232)})();