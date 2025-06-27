import express from 'express';
import pollRouter from './poll.route.js';
import UserRouter from './user.route.js';
import AuthRouter from './auth.route.js';

const mainRouter = express.Router();
// test
mainRouter.get('/', (req, res) => {
  res.send('Xin chào mọi người');
});

mainRouter.use('/api/polls', pollRouter);
mainRouter.use('/api/users', UserRouter);
mainRouter.use('/api/auth', AuthRouter);

export default mainRouter;
