import User from '../models/UserModel.js';
import { hashpass, comparePassword } from '../until/hashpass.js';
import jwt from 'jsonwebtoken';

class AuthService {
  constructor() {
    // // Provide default values if environment variables are not set
    // this.jwtSecret = process.env.JWT_SECRET || 'SecretKeyCuaTao';
    // this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'RefreshSecretKeyCuatao';
    
    // // Log warning if using default values
    // if (!process.env.JWT_SECRET) {
    //   console.warn('Warning: Using default JWT_SECRET. Please set it in .env file');
    // }
    // if (!process.env.JWT_REFRESH_SECRET) {
    //   console.warn('Warning: Using default JWT_REFRESH_SECRET. Please set it in .env file');
    // }
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
      password: hashedPassword 
    });
    
    return await newUser.save();
  }

  async login(username, password) {
    console.log('Login attempt for username:', username); // Debug log

    // Find user
    const user = await User.findOne({ username });
    console.log('Found user:', user ? 'Yes' : 'No'); // Debug log

    if (!user) {
      return { error: 'User not found' };
    }

    // Verify password
    const isMatch = comparePassword(password, user.password);
    console.log('Password match:', isMatch); // Debug log

    if (!isMatch) {
      return { error: 'Invalid password' };
    }

    // Generate tokens
    const accessToken = this._generateAccessToken(user);
    const refreshToken = this._generateRefreshToken(user);
    console.log('Generated tokens:', { accessToken, refreshToken }); // Debug log

    return {
      accessToken,
      refreshToken,
      user: this._getUserData(user)
    };
  }

  async refreshToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, this.jwtRefreshSecret);
      
      // Get user
      const user = await User.findById(decoded.id);
      if (!user) {
        return { error: 'User not found' };
      }

      // Generate new tokens
      const accessToken = this._generateAccessToken(user);
      const newRefreshToken = this._generateRefreshToken(user);

      return {
        accessToken,
        refreshToken: newRefreshToken,
        user: this._getUserData(user)
      };
    } catch (error) {
      return { error: 'Invalid refresh token' };
    }
  }

  async getMe(userId) {
    const user = await User.findById(userId);
    if (!user) {
      return { error: 'User not found' };
    }
    return this._getUserData(user);
  }

  // Private helper methods
  _generateAccessToken(user) {
    return jwt.sign(
      { id: user._id, username: user.username },
      this.jwtSecret,
      { expiresIn: '10m' }
    );
  }

  _generateRefreshToken(user) {
    return jwt.sign(
      { id: user._id },
      this.jwtRefreshSecret,
      { expiresIn: '7d' }
    );
  }

  _getUserData(user) {
    return {
      userId: user._id,
      name: user.name,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      username: user.username,
      role: user.role
    };
  }

  getCookieOptions() {
    return {
      httpOnly: true,
      secure: false, // Set to false for development
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };
  }
}

// Create instance and export
const authService = new AuthService();
export default authService;
