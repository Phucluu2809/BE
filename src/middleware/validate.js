import User from '../models/UserModel.js';

class UserValidator {
  constructor() {
    this.requiredFields = ['name', 'gender', 'email', 'phone', 'username', 'password'];
  }

  validateEmail(email) {
    return /^[^\s@]+@(gmail|outlook)\.com$/.test(email);
  }

  validatePhone(phone) {
    return /^\d{10}$/.test(phone);
  }

  async checkExistingUser(newUser, userId = null) {
    const condition = userId ? {
      $and: [
        { _id: { $ne: userId } },
        {
          $or: [
            { email: newUser.email },
            { phone: newUser.phone },
            { username: newUser.username }
          ]
        }
      ]
    } : {
      $or: [
        { email: newUser.email },
        { phone: newUser.phone },
        { username: newUser.username }
      ]
    };

    return await User.findOne(condition);
  }

  async validateUser(req, res, next) {
    try {
      const newUser = req.body;

      // Check required fields
      for (const field of this.requiredFields) {
        if (!newUser[field]) {
          return res.status(400).json({ 
            success: false, 
            error: `Thiếu trường ${field}` 
          });
        }
      }

      // Validate email format
      if (!this.validateEmail(newUser.email)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email phải có đuôi @gmail.com hoặc @outlook.com' 
        });
      }

      // Validate phone format
      if (!this.validatePhone(newUser.phone)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Số điện thoại phải có 10 chữ số' 
        });
      }

      // Check for existing user
      const userId = req.method === 'PUT' ? req.params.id : null;
      const existingUser = await this.checkExistingUser(newUser, userId);
      
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email, số điện thoại hoặc username đã tồn tại' 
        });
      }

      next();
    } catch (error) {
      console.error('Lỗi validate:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message || 'Lỗi server khi validate' 
      });
    }
  }
}

const userValidator = new UserValidator();
export const validateUser = userValidator.validateUser.bind(userValidator);
