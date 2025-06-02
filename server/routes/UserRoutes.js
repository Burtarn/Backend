import { Router } from 'express';
import { signup, login } from '../controllers/usersController.js';
import validate from '../middleware/validate.js';
import { signupSchema, loginSchema } from '../validators/userValidator.js';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

export default router;
