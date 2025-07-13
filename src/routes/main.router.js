import express from 'express';
import bookRouter from './book.route.js';
import UserRouter from './user.route.js';
import AuthRouter from './auth.route.js';

const mainRouter = express.Router();

mainRouter.use('/api/books', bookRouter);
mainRouter.use('/api/users', UserRouter);
mainRouter.use('/api/auth', AuthRouter);

export default mainRouter;
    