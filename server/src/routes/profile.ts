import { getProfileInfo } from '../controllers/profileController';
import { Router } from 'express';

const router: Router = Router();

router.get('/:username', getProfileInfo);

export default router;
