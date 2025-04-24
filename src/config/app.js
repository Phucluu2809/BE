import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from '../../routes/user_router.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/', userRouter);

class DataBase {
    constructor() {
        this.connect();
    }

    async connect(type = 'mongodb') {
        const connectString = 'mongodb://localhost:27017/mySGroup'; 

        if (!connectString) {
            console.error('Chuỗi kết nối MongoDB chưa được định nghĩa!');
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

    // Singleton pattern để chỉ có một instance của lớp DataBase
    static getInstance() {
        if (!DataBase.instance) {
            DataBase.instance = new DataBase();
        }
        return DataBase.instance;
    }
}

const db = DataBase.getInstance();

export default app;
