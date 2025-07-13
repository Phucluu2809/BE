import { Router } from 'express';
import { 
  getAllBooks,
  getBookById,
  createBook,
} from '../controllers/bookController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { checkAuth } from '../middleware/checkAuth.js';
import { isAdmin } from '../middleware/roleCheck.js';
import {review} from '../controllers/reviewController.js' 
const router = Router();

// Book Management  
router.get('/', checkAuth, asyncHandler(getAllBooks));
router.get('/:id', checkAuth, asyncHandler(getBookById));
router.post('/', checkAuth, isAdmin, asyncHandler(createBook));

// Review    
router.post('/:id/review', checkAuth, asyncHandler(review));
router.delete('review/:id',checkAuth);



export default router;
