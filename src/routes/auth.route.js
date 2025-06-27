import { Router } from 'express';
import { login, register, logout, processNewToken } from '../controllers/authcontroller.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = Router();

router.post('/login', asyncHandler(login));
router.post('/register', asyncHandler(register));
router.post('/refresh-token', asyncHandler(processNewToken));
router.post('/logout', asyncHandler(logout));

export default router;
