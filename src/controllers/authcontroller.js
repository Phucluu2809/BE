import authService from '../service/authservice.js';
import SuccessResponse from '../handler/succes.response.js';
import ErrorResponse from '../handler/error.response.js';

class AuthController {
  constructor() {
    this.authService = authService;
  }

  // Register new user
  async register(req, res) {
    try {
      const userData = req.body;
      const newUser = await this.authService.register(userData);
      return SuccessResponse.Created(
        { userId: newUser._id },
        'Registration successful'
      ).send(res);
    } catch (error) {
      console.error('Registration error:', error);
      return ErrorResponse.InternalServer('Error during registration').send(res);
    }
  }

  // Login user
  async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log('Login attempt:', { username, password: '***' });
      
      if (!username || !password) {
        return ErrorResponse.BadRequest('Username and password are required').send(res);
      }

      const result = await this.authService.login(username, password);
      console.log('Login result:', result);
      
      if (result.error) {
        return ErrorResponse.Unauthorized(result.error).send(res);
      }

      // Set refresh token in HTTP-only cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      return SuccessResponse.OK({
        accessToken: result.accessToken,
        user: result.user
      }, 'Login successful').send(res);
    } catch (error) {
      console.error('Login error details:', error);
      return ErrorResponse.InternalServer('Error during login').send(res);
    }
  }

  async processNewToken(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const result = await this.authService.refreshToken(refreshToken);

      if (result.error) {
        return ErrorResponse.Unauthorized(result.error).send(res);
      }

      // Set new refresh token in cookie
      res.cookie(
        'refreshToken', 
        result.refreshToken, 
        this.authService.getCookieOptions()
      );

      return SuccessResponse.OK({
        accessToken: result.accessToken,
        user: result.user
      }, 'Refresh token thành công').send(res);
    } catch (err) {
      console.error('Error refreshing token:', err);
      return ErrorResponse.InternalServer('Lỗi server khi làm mới token').send(res);
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie('refreshToken', this.authService.getCookieOptions());
      return SuccessResponse.OK(null, 'Đăng xuất thành công').send(res);
    } catch (err) {
      return ErrorResponse.InternalServer('Lỗi server khi đăng xuất').send(res);
    }
  }

  async getMe(req, res) {
    try {
      const result = await this.authService.getMe(req.userId);
      
      if (result.error) {
        return ErrorResponse.NotFound(result.error).send(res);
      }

      return SuccessResponse.OK(result, 'Lấy thông tin người dùng thành công').send(res);
    } catch (err) {
      console.error('Error getting user info:', err);
      return ErrorResponse.InternalServer('Lỗi server khi lấy thông tin người dùng').send(res);
    }
  }
}

// Create instance and export methods
const authController = new AuthController();
export const register = authController.register.bind(authController);
export const login = authController.login.bind(authController);
export const processNewToken = authController.processNewToken.bind(authController);
export const logout = authController.logout.bind(authController);
export const getMe = authController.getMe.bind(authController);