import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,  //Mô tả cái ấy=))
  },
  votes: {
    type: Number,
    default: 0, // Số phiếu của option này nhận đc=))
  },
  userVotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Tham chiếu đến usermode coi ai đã tạo vote 
    },
  ],
});

const pollSchema = new mongoose.Schema(
  {
    title: {                      //Tiêu đề 
      type: String,
      required: true,
    },
    description: {                //Mô tả
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Tham chiếu đến người tạo poll
      required: true,
    },
    options: [optionSchema], // Các lựa chọn cho poll
    isLocked: {
      type: Boolean,
      default: false, // Trạng thái của poll (có bị khóa hay không)
    },
    expiresAt: {
      type: Date, // Thời gian hết hạn của poll (tuỳ chọn)
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Poll', pollSchema);
