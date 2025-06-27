import { Router } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from '../controllers/usercontroller.js';
import { checkAuth } from '../middleware/checkAuth.js';
import { isAdmin } from '../middleware/roleCheck.js';

const router = Router();

router.get('/', checkAuth, isAdmin, asyncHandler(getAllUsers));
router.get('/:id', checkAuth, isAdmin, asyncHandler(getUserById));
router.post('/', checkAuth, isAdmin, asyncHandler(addUser));
router.put('/:id', checkAuth, isAdmin, asyncHandler(updateUser));
router.delete('/:id', checkAuth, isAdmin, asyncHandler(deleteUser));

export default router;
