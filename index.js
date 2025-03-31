// const express = require('express');
import express from 'express';
import dotenv from 'dotenv'; // import thư viện dotenv
dotenv.config(); // gọi hàm config() trong dotenv , tác dụng là đọc tệp trong .env

const PORT = process.env.PORT; // gọi port trong env

const app = express(); // tạo đối tượng app từ thư viện express

app.get('/', (req, res) => { //route
  // res.send('chau thanh binh');
  res.status(200).json({ // trả về status code là 200 và 1 obj json
    message: 'hello world',
    name: 'thanh binh',
    age: '20'
  })
})

app.listen(8000, () => { // lắng nghe các yêu cầu http trên port 8000
  console.log(`server in running on http://localhost:${PORT}`);
})

// sự khác nhau giữa import là require( hay dùng import)
// so sánh giữa web server (Nginx, Apache) và server backend
// về nhà tìm hiểu những cái vừa code và những file .env, .gitignore, folder có trong project
// .env chỉ có number or string

// .env lưu các biến quan trọng , api-key, mk database,... những thông tin cần đc bảo mật