import Poll from '../models/poll.model.js';
import SuccessResponse from '../handler/succes.response.js';
import ErrorResponse from '../handler/error.response.js';

class VoteController {
  async vote(req, res, next) {
    try {
      const pollId = req.params.id;
      const { optionId } = req.body;
      const userId = req.userId;

      if (!optionId) {
        throw ErrorResponse.BadRequest('Option ID là bắt buộc');
      }

      const poll = await Poll.findById(pollId);
      if (!poll) {
        throw ErrorResponse.NotFound('Không tìm thấy poll');
      }

      const option = poll.options.id(optionId);
      if (!option) {
        throw ErrorResponse.NotFound('Không tìm thấy option');
      }

      if (option.userVotes.includes(userId)) {
        throw ErrorResponse.BadRequest('Bạn đã vote cho option này rồi');
      }

      option.userVotes.push(userId);
      option.votes += 1;
      await poll.save();

      SuccessResponse.OK(null, 'Vote thành công').send(res);
    } catch (error) {
      next(error);
    }
  }

  async unvote(req, res, next) {
    try {
      const pollId = req.params.id;
      const { optionId } = req.body;
      const userId = req.userId;

      if (!optionId) {
        throw ErrorResponse.BadRequest('Option ID là bắt buộc');
      }

      const poll = await Poll.findById(pollId);
      if (!poll) {
        throw ErrorResponse.NotFound('Không tìm thấy poll');
      }

      const option = poll.options.id(optionId);
      if (!option) {
        throw ErrorResponse.NotFound('Không tìm thấy option');
      }

      const userVoteIndex = option.userVotes.indexOf(userId);
      if (userVoteIndex === -1) {
        throw ErrorResponse.BadRequest('Bạn chưa vote cho option này');
      }

      option.userVotes.splice(userVoteIndex, 1);
      option.votes -= 1;
      await poll.save();

      SuccessResponse.OK(null, 'Unvote thành công').send(res);
    } catch (error) {
      next(error);
    }
  }
}

const voteController = new VoteController();

export const vote = voteController.vote.bind(voteController);
export const unvote = voteController.unvote.bind(voteController);
