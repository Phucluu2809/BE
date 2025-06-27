import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mainRouter from '../routes/main.router.js'; 

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
    this.app.use(mainRouter); 
  }

  async connectDatabase() {
    try {
      await mongoose.connect(process.env.Mongo_URL);

      console.log('MongoDB kết nối thành công!');
    } catch (error) {
      console.error('MongoDB kết nối lỗi:', error.message);
    }
  }

  getExpressApp() {
    return this.app;
  }

  static getInstance() {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }
}

export default App.getInstance().getExpressApp();
