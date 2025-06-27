import { Router } from 'express';
import {
  getAllPolls,
  getPollById,
  createPoll,
  updatePoll,
  deletePoll,
  lockPoll,
  unlockPoll,
  addOption,
  removeOption,
} from '../controllers/pollController.js';
import { vote, unvote } from '../controllers/voteController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { checkAuth } from '../middleware/checkAuth.js';
import { isAdmin } from '../middleware/roleCheck.js';

const router = Router();

// Poll Management
router.get('/', checkAuth, asyncHandler(getAllPolls));
router.get('/:id', checkAuth, asyncHandler(getPollById));
router.post('/', checkAuth, isAdmin, asyncHandler(createPoll));
router.put('/:id', checkAuth, isAdmin, asyncHandler(updatePoll));
router.delete('/:id', checkAuth, isAdmin, asyncHandler(deletePoll));
router.post('/:id/lock', checkAuth, isAdmin, asyncHandler(lockPoll));
router.post('/:id/unlock', checkAuth, isAdmin, asyncHandler(unlockPoll));
router.post('/:id/options', checkAuth, isAdmin, asyncHandler(addOption));
router.delete('/:id/options/:optionId', checkAuth, isAdmin, asyncHandler(removeOption));

// Vote Management
router.post('/:id/vote', checkAuth, asyncHandler(vote));
router.post('/:id/unvote', checkAuth, asyncHandler(unvote));

export default router;
