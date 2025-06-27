import SuccessResponse from '../handler/succes.response.js';
import ErrorResponse from '../handler/error.response.js';
import AuthService from '../service/authservice.js';

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      const data = req.body;
      const user = await this.authService.register(data);
      SuccessResponse.Created({ user }, 'User registered successfully').send(res);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const result = await this.authService.login(username, password);
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      SuccessResponse.OK({ accessToken: result.accessToken, user: result.user }, 'Login successful').send(res);
    } catch (error) {
      next(error);
    }
  };

  processNewToken = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const result = await this.authService.refreshToken(refreshToken);

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      SuccessResponse.OK({ accessToken: result.accessToken }, 'Token refreshed successfully').send(res);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      res.clearCookie('refreshToken', { httpOnly: true });
      SuccessResponse.OK(null, 'Logout successful').send(res);
    } catch (error) {
      next(error);
    }
  };
}

const authController = new AuthController(new AuthService());
export const register = authController.register;
export const login = authController.login;
export const processNewToken = authController.processNewToken;
export const logout = authController.logout;
