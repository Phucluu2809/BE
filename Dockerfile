# Sử dụng image chính thức của Node.js
FROM node:16

# Thiết lập thư mục làm việc trong container
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]
