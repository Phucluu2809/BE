import User from '../models/usermodel.js';

class UserService {
  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async addUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async updateUser(id, userData) {
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    return updatedUser;
  }

  async deleteUser(id) {
    const result = await User.findByIdAndDelete(id);
    return result !== null;
  }
}

export default new UserService();