import express from 'express';
import mongoose from 'mongoose';
import pollRouter from '../../routes/poll_router.js';
import cookieParser from 'cookie-parser';

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.connectDatabase();
  }

  setupMiddleware() {
    this.app.use((req, res, next) => {
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        express.json()(req, res, next); // Chỉ parse body JSON cho các phương thức này
      } else {
        next();
      }
    });
    this.app.use(cookieParser());
  }


  setupRoutes() {
    this.app.use('/', pollRouter);
  }

  async connectDatabase() {
    const connectString = 'mongodb+srv://Phucluu:300105@cluster0.agdiigy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
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
