import app from './src/config/app.js';  
import dotenv from 'dotenv';
import uploadRouter from './routes/upload_router.js';  

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use('/', uploadRouter); 

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
