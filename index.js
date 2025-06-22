import app from './src/config/app.js';  
import dotenv from 'dotenv';

const PORT = 8000;

const mongoURI = process.env.MONGO_URI;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
