import { Router } from 'express';
import { signup, login, deleteUser } from '../controllers/usersController.js';
import validate from '../middleware/validate.js';
import { signupSchema, loginSchema } from '../validators/userValidator.js';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.delete('/:id', deleteUser);

export default router;
