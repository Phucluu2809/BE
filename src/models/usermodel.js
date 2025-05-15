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
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: {
     type: String, 
     required: true 
  }
}, { timestamps: false,  versionKey: false });   // tắt createAt and updateAT, xóa luôn cái __v đằng sau=))

export default mongoose.model('User', userSchema);

// đưa em vào 