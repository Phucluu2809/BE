import userService from '../service/user_service.js';
import SuccessResponse from '../handler/succes.response.js';
import ErrorResponse from '../handler/error.response.js';

class UserController {
  constructor() {
    this.userService = userService;
    // Bind methods to instance
    this.getAllUser = this.getAllUser.bind(this);
    this.getUserByID = this.getUserByID.bind(this);
    this.addUser = this.addUser.bind(this);
    this.putUser = this.putUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async getAllUser() {
    try {
      console.log('Getting all users...'); // Debug log
      const users = await this.userService.getAllUsers();
      console.log('Users found:', users); // Debug log
    
      if (!users || users.length === 0) {
       throw new Error('Users not found!');
      }

     return users; // Trả về dữ liệu
    } catch (error) {
      console.error('Error in getAllUser:', error); // Error log
      throw error; // Ném lỗi để xử lý tại router
   }
  }


  async getUserByID(req, res) {
    try {
      const id = req.params.id;
      const user = await this.userService.getUserById(id);
      if (!user) {
        return ErrorResponse.NotFound('User not found!').send(res);
      }
      return SuccessResponse.OK(user, 'User retrieved successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error retrieving user').send(res);
    }
  }

  async addUser(req, res) {
    try {
      const user = req.body;
      const newUser = await this.userService.addUser(user);
      return SuccessResponse.Created(newUser, 'User created successfully').send(res);
    } catch (error) {
      console.error('Lỗi khi thêm user:', error);
      return ErrorResponse.InternalServer('Error creating user').send(res);
    }
  }

  async putUser(req, res) {
    try {
      const id = req.params.id;
      const user = req.body;
      const updateUser = await this.userService.updateUser(id, user);
      if (!updateUser) {
        return ErrorResponse.NotFound('User not found!').send(res);
      }
      return SuccessResponse.OK(updateUser, 'User updated successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error updating user').send(res);
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const isDeleted = await this.userService.deleteUser(id);
      if (!isDeleted) {
        return ErrorResponse.NotFound('User not found!').send(res);
      }
      return SuccessResponse.OK(null, 'User deleted successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error deleting user').send(res);
    }
  }
}

// Create instance and export
const userController = new UserController();
export default userController;
