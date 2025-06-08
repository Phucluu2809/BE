import User from '../models/usermodel.js';
import ErrorResponse from '../handler/error.response.js';

export const isAdmin = async (req, res, next) => {
  try {
    console.log('Checking admin role for user:', req.userId); // Debug log
    
    const user = await User.findById(req.userId);
    console.log('Found user:', user); // Debug log
    
    if (!user) {
      return ErrorResponse.NotFound('User not found').send(res);
    }

    if (user.role !== 'admin') {
      return ErrorResponse.Forbidden('Access denied. Admin privileges required.').send(res);
    }

    next();
  } catch (error) {
    console.error('Error checking admin role:', error); // Debug log
    return ErrorResponse.InternalServer('Error checking user role').send(res);
  }
}; 