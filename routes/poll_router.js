import { Router } from 'express';
import { checkAuth } from '../src/middleware/checkAuth.js';
import { isAdmin } from '../src/middleware/roleCheck.js';
import pollController from '../src/controllers/pollController.js';
import { validateUser } from '../src/middleware/validate.js';
import { register, login } from '../src/controllers/authcontroller.js';
import userController from '../src/controllers/usercontroller.js';
import voteController from '../src/controllers/voteController.js';

const router = Router();
// test with anh nhân
    router.get('/', async (req, res, next) => {
        try {
            const users = await userController.getAllUser();
            res.send("xin chao moi nguoi" );
            
        } catch (error) {
            console.error('Error in /getAll_information:', error);
            res.status(500).json({ error: error.message });
        }
        });
    router.get('/:id', userController.getUserByID);
// User Management
router.post('/api/auth/register', validateUser, register);  
router.post('/api/auth/login', login);  
router.get('/api/users', checkAuth, isAdmin, userController.getAllUser); 
router.get('/api/users/:id', checkAuth, isAdmin, userController.getUserByID);
router.put('/api/users/:id', checkAuth, isAdmin, userController.putUser);
router.delete('/api/users/:id', checkAuth, isAdmin, userController.deleteUser);

// Poll Management
router.get('/api/polls', checkAuth, pollController.getAllPolls);   
router.get('/api/polls/:id', checkAuth, pollController.getPollById);
router.post('/api/polls', checkAuth, isAdmin, pollController.createPoll);
router.put('/api/polls/:id', checkAuth, isAdmin, pollController.updatePoll);
router.delete('/api/polls/:id', checkAuth, isAdmin, pollController.deletePoll);
router.post('/api/polls/:id/lock', checkAuth, isAdmin, pollController.lockPoll);
router.post('/api/polls/:id/unlock', checkAuth, isAdmin, pollController.unlockPoll);
router.post('/api/polls/:id/options', checkAuth, isAdmin, pollController.addOption);
router.delete('/api/polls/:id/options/:optionId', checkAuth, isAdmin, pollController.removeOption);

// Vote Management
router.post('/api/polls/:id/vote', checkAuth, voteController.vote);
router.post('/api/polls/:id/unvote', checkAuth, voteController.unvote);

export default router;
