import User from '../models/UserModel.js';

export const validateUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const requiredFields = ['name', 'gender', 'email', 'phone'];

    for (const field of requiredFields) {
      if (!newUser[field]) {
        return res.status(400).json({ success: false, error: `Thiếu trường ${field}` });
      }
    }

    if (!/^[^\s@]+@(gmail|outlook)\.com$/.test(newUser.email)) {
      return res.status(400).json({ success: false, error: 'Email phải có đuôi @gmail.com hoặc @outlook.com' });
    }

    if (!/^\d{10}$/.test(newUser.phone)) {
      return res.status(400).json({ success: false, error: 'Số điện thoại phải có 10 chữ số' });
    }

    const condition = req.method === 'PUT' ? {
      $and: [
        { _id: { $ne: req.params.id } },
        { $or: [{ email: newUser.email }, { phone: newUser.phone }] }
      ]
    } : {
      $or: [{ email: newUser.email }, { phone: newUser.phone }]
    };

    const existingUser = await User.findOne(condition);
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email hoặc số điện thoại đã tồn tại' });
    }

    next();
  } catch (error) {
    console.error('Lỗi validate:', error);
    res.status(500).json({ success: false, error: error.message || 'Lỗi server khi validate' });
  }
};
