import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  username: { 
    type: String, 
    required: true, 
  },
  password: {
     type: String, 
     required: true 
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: false,  versionKey: false });   // tắt createAt and updateAT, xóa luôn cái __v đằng sau=))

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
