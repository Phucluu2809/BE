import { Router } from 'express';
import userController from '../src/controllers/usercontroller.js';
import { validateUser } from '../src/middleware/validate.js';

const router = Router();

router.get('/users', userController.getAllUser);
router.get('/users/:id', userController.getUserByID);
router.post('/users', validateUser, userController.addUser);
router.put('/users/:id', validateUser, userController.putUser);
router.delete('/users/:id', userController.deleteUser);

export default router; 