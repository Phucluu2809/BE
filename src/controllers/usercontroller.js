import SuccessResponse from '../handler/succes.response.js';
import ErrorResponse from '../handler/error.response.js';
import userService from '../service/user_service.js';

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      if (!users.length) {
        throw ErrorResponse.NotFound('No users found');
      }
      SuccessResponse.OK(users, 'Users retrieved successfully').send(res);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        throw ErrorResponse.NotFound('User not found');
      }
      SuccessResponse.OK(user, 'User retrieved successfully').send(res);
    } catch (error) {
      next(error);
    }
  }

  async addUser(req, res, next) {
    try {
      const user = await userService.addUser(req.body);
      SuccessResponse.Created(user, 'User created successfully').send(res);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        throw ErrorResponse.NotFound('User not found');
      }
      SuccessResponse.OK(updatedUser, 'User updated successfully').send(res);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const isDeleted = await userService.deleteUser(req.params.id);
      if (!isDeleted) {
        throw ErrorResponse.NotFound('User not found');
      }
      SuccessResponse.OK(null, 'User deleted successfully').send(res);
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();
export const getAllUsers = userController.getAllUsers.bind(userController);
export const getUserById = userController.getUserById.bind(userController);
export const addUser = userController.addUser.bind(userController);
export const updateUser = userController.updateUser.bind(userController);
export const deleteUser = userController.deleteUser.bind(userController);
