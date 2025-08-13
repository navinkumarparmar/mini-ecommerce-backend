import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validate';

import { registerSchema, loginSchema } from '../validation/auth.validation';

const router = Router();

router.post('/register', validateBody(registerSchema), registerUser);
router.post('/login', validateBody(loginSchema), loginUser);

export default router;
