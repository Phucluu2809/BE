import Poll from '../models/poll.model.js'; 
import User from '../models/usermodel.js'; 
import SuccessResponse from '../handler/succes.response.js';
import ErrorResponse from '../handler/error.response.js';

class VoteController {
  // Vote một option trong poll
  async vote(req, res) {
    try {
      const pollId = req.params.id; // Lấy id poll từ url 
      const { optionId } = req.body;  //id option trong cái body 
      const userId = req.userId; 
      
      if (!optionId) {
        return ErrorResponse.BadRequest('Option ID là bắt buộc').send(res);
      }

      const poll = await Poll.findById(pollId);
      if (!poll) {
        return ErrorResponse.NotFound('Không tìm thấy poll').send(res);
      }

      const option = poll.options.id(optionId);
      if (!option) {
        return ErrorResponse.NotFound('Không tìm thấy option').send(res);
      }

      // Kiểm tra xem user đã vote hay chưa
      if (option.userVotes.includes(userId)) {
        return ErrorResponse.BadRequest('Bạn đã vote cho option này rồi').send(res);
      }

      // Thêm user vào danh sách votes và tăng số phiếu
      option.userVotes.push(userId);
      option.votes += 1;

      await poll.save();

      return SuccessResponse.OK(null, 'Vote thành công').send(res);
    } catch (error) {
      console.error('Vote error:', error);
      return ErrorResponse.InternalServer('Lỗi khi thực hiện vote').send(res);
    }
  }

  // Unvote một option trong poll
  async unvote(req, res) {
    try {
      const pollId = req.params.id; // Lấy pollId từ URL params
      const { optionId } = req.body;
      const userId = req.userId; // ID user được lấy từ JWT middleware

      if (!optionId) {
        return ErrorResponse.BadRequest('Option ID là bắt buộc').send(res);
      }

      const poll = await Poll.findById(pollId);
      if (!poll) {
        return ErrorResponse.NotFound('Không tìm thấy poll').send(res);
      }

      const option = poll.options.id(optionId);
      if (!option) {
        return ErrorResponse.NotFound('Không tìm thấy option').send(res);
      }

      // Kiểm tra xem user đã vote hay chưa
      const userVoteIndex = option.userVotes.indexOf(userId);
      if (userVoteIndex === -1) {
        return ErrorResponse.BadRequest('Bạn chưa vote cho option này').send(res);
      }

      // Xóa user khỏi danh sách votes và giảm số phiếu
      option.userVotes.splice(userVoteIndex, 1);
      option.votes -= 1;

      await poll.save();

      return SuccessResponse.OK(null, 'Unvote thành công').send(res);
    } catch (error) {
      console.error('Unvote error:', error);
      return ErrorResponse.InternalServer('Lỗi khi thực hiện unvote').send(res);
    }
  }
}

// Create instance
const voteController = new VoteController();

// Bind methods and export
export default {
  vote: voteController.vote.bind(voteController),
  unvote: voteController.unvote.bind(voteController)
};
