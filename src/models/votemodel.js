import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Tham chiếu đến id user
      required: true,
    },
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll', // Tham chiếu đến id poll
      required: true,
    },
    option: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Option', // Tham chiếu đến id option
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Vote', voteSchema);
