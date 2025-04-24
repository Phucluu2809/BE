import userService from '../service/user_service.js';

const getAllUser = async (req, res) => {
  const user = await userService.getAllUsers();
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  res.status(200).json(user);
};

const getUserByID = async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  res.status(200).json(user);
};

const addUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await userService.addUser(user);
    res.status(201).json({
      success: true,
      data: newUser
    });
  } catch (error) {
    console.error('Lỗi khi thêm user:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Lỗi server khi thêm người dùng'
    });
  }
};

const putUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updateUser = await userService.updateUser(id, user);
    if (!updateUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await userService.deleteUser(id);
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  getAllUser,
  getUserByID,
  addUser,
  putUser,
  deleteUser
};
