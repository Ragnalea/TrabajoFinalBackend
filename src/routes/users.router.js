import { Router } from 'express';
import { togglePremium } from '../controllers/users.controller.js';

const router = Router();

router.post('/premium/:uid', togglePremium);

export default router;
