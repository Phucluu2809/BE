import jwt from 'jsonwebtoken';

class AuthMiddleware {
  constructor() {
    this.jwtSecret = 'SecretKeyCuaTao';
  }

  checkAuth(req, res, next) {
    try {
      // token từ headers của request
      const authHeader = req.headers.authorization;
      console.log('Auth header:', authHeader); 

      if (!authHeader) {
        return res.status(401).json({ error: 'Không có token, bạn cần đăng nhập' });
      }

      const token = authHeader.split(' ')[1];
      console.log('Token:', token); 

      if (!token) {
        return res.status(401).json({ error: 'Token không đúng định dạng' });
      }

      // giải mã token  
      const decoded = jwt.verify(token, this.jwtSecret);
      console.log('Decoded token:', decoded); 

      // lưu thông tin người dùng vào request
      req.userId = decoded.id;
      next();
    } catch (err) {
      console.error('Auth error:', err); 
      return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
    }
  }

  checkAuthLogout(req, res, next) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Không có token, bạn chưa đăng nhập!" });
    }
    next();
  }
}

const authMiddleware = new AuthMiddleware();
export const checkAuth = authMiddleware.checkAuth.bind(authMiddleware);
export const checkauthlogout = authMiddleware.checkAuthLogout.bind(authMiddleware);