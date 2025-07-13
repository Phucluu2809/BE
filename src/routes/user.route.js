import { Router } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import {
  getAllUsers,
  getMe,
  deleteUser, 
} from '../controllers/usercontroller.js';
import { checkAuth } from '../middleware/checkAuth.js';
import { isAdmin } from '../middleware/roleCheck.js';

const router = Router();

router.get('/', checkAuth, isAdmin, asyncHandler(getAllUsers));
router.get('/me', checkAuth, asyncHandler(getMe));
router.delete('/:id', checkAuth, isAdmin, asyncHandler(deleteUser));

export default router;
