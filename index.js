import app from './src/config/app.js';  // Đảm bảo đường dẫn chính xác đến file app.js

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
