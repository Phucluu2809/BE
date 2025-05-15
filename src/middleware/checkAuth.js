import jwt from 'jsonwebtoken';

class AuthMiddleware {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
  }

  checkAuth(req, res, next) {
    try {
      // token từ headers của request
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ error: 'Không có token, bạn cần đăng nhập' });
      }

      // giải mã token
      const decoded = jwt.verify(token, this.jwtSecret);

      // lưu thông tin người dùng vào request
      req.userId = decoded.id;
      next();
    } catch (err) {
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