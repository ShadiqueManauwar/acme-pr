import { Router } from 'express';
import { signin, signup, signOut } from '../controllers/authController';

const router: Router = Router();

router.post('/signin', signin);
router.post('/signout', signOut);
router.post('/signup', signup);

export default router;
