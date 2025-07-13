import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    option: {      
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Review', voteSchema);
