import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from '../../routes/user_router.js';
import cookieParser from 'cookie-parser';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.connectDatabase();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  setupRoutes() {
    this.app.use('/', userRouter);
  }

  async connectDatabase() {
    const connectString = process.env.Mongo_URL || 'mongodb://localhost:27017/mySGroup';
    
    if (!connectString) {
      console.error('Chuỗi kết nối MongoDB không tồn tại!');
      return;
    }

    try {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });

      await mongoose.connect(connectString);
      console.log('MongoDB kết nối thành công!');
    } catch (error) {
      console.error('MongoDB kết nối lỗi :', error.message);
    }
  }

  getExpressApp() {
    return this.app;
  }

  // Singleton pattern
  static getInstance() {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }
}

// Create and export the singleton instance's Express app
export default App.getInstance().getExpressApp();
