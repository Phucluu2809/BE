import { Router } from 'express';
import userController from '../src/controllers/usercontroller.js';
import { validateUser } from '../src/middleware/validate.js';
import { register, login, processNewToken, logout, getMe } from '../src/controllers/authcontroller.js';
import { checkAuth, checkauthlogout } from '../src/middleware/checkAuth.js';

const router = Router();

router.get('/users', userController.getAllUser);
router.get('/users/:id', userController.getUserByID);
router.post('/users', validateUser, userController.addUser);
router.put('/users/:id', validateUser, userController.putUser);
router.delete('/users/:id', userController.deleteUser);


router.post('/api/v1/auth/register',validateUser, register);
router.post('/api/v1/auth/login', login);
router.post('/api/v1/auth/processNewToken', processNewToken); 
router.post('/api/v1/auth/logout', checkauthlogout, logout);
router.get('/api/v1/users/me', checkAuth, getMe);  



export default router; 

    