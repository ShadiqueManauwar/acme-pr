import {
  commentOnPost,
  createPost,
  getAllPosts,
  getPost,
  getUserPosts,
  replyOnComment,
  voteAPost,
} from '../controllers/posts';
import { Router } from 'express';

const router: Router = Router();

router.get('/', getAllPosts);
router.get('/user-posts', getUserPosts);
router.get('/:postId', getPost);
router.post('/create', createPost);
router.post('/vote', voteAPost);
router.post('/comment', commentOnPost);
router.post('/comment/reply', replyOnComment);

export default router;
