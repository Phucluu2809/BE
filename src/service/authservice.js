import User from '../models/usermodel.js';
import { hashpass, comparePassword } from '../until/hashpass.js';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../handler/error.response.js';

class AuthService {
  constructor() {
    this.jwtSecret = 'SecretKeyCuaTao';
    this.jwtRefreshSecret = 'RefreshSecretKeyCuatao';
  }

  async findByUsername(username) {
    return await User.findOne({ username });
  }

  async register(userData) {
    const { name, gender, email, phone, username, password } = userData;
    const hashedPassword = hashpass(password);

    const newUser = new User({
      name,
      gender,
      email,
      phone,
      username,
      password: hashedPassword,
    });

    return await newUser.save();
  }

  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
      throw ErrorResponse.NotFound('User not found');
    }

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      throw ErrorResponse.BadRequest('Invalid password');
    }

    const accessToken = this._generateAccessToken(user);
    const refreshToken = this._generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      user: this._getUserData(user),
    };
  }

  async refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, this.jwtRefreshSecret);
      const user = await User.findById(decoded.id);
      if (!user) {
        throw ErrorResponse.NotFound('User not found');
      }

      const accessToken = this._generateAccessToken(user);
      const newRefreshToken = this._generateRefreshToken(user);

      return {
        accessToken,
        refreshToken: newRefreshToken,
        user: this._getUserData(user),
      };
    } catch (error) {
      throw ErrorResponse.Unauthorized('Invalid refresh token');
    }
  }

  async getMe(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw ErrorResponse.NotFound('User not found');
    }
    return this._getUserData(user);
  }

  _generateAccessToken(user) {
    return jwt.sign(
      { id: user._id, username: user.username },
      this.jwtSecret,
      { expiresIn: '10m' }
    );
  }

  _generateRefreshToken(user) {
    return jwt.sign({ id: user._id }, this.jwtRefreshSecret, { expiresIn: '7d' });
  }

  _getUserData(user) {
    return {
      userId: user._id,
      name: user.name,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      username: user.username,
      role: user.role,
    };
  }

  getCookieOptions() {
    return {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }
}

export default AuthService;
