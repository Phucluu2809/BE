import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
  },
  description: {
     type: String, 
     required: true 
  },
}, { timestamps: true,  versionKey: false });   

const Book = mongoose.models.Book || mongoose.model('Book', userSchema);

export default Book;



