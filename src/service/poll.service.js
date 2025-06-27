import Poll from '../models/poll.model.js';
import ErrorResponse from '../handler/error.response.js';

class PollService {
  async getAllPolls() {
    return await Poll.find();
  }

  async getPollById(id) {
    return await Poll.findById(id);
  }

  async createPoll(pollData) {
    const poll = new Poll(pollData);
    return await poll.save();
  }

  async updatePoll(id, updateData) {
    return await Poll.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deletePoll(id) {
    return await Poll.findByIdAndDelete(id);
  }

  async updatePollStatus(id, isActive) {
    return await Poll.findByIdAndUpdate(id, { isActive }, { new: true });
  }

  async addOption(id, option) {
    const poll = await Poll.findById(id);
    if (!poll) throw ErrorResponse.NotFound('Poll not found');
    poll.options.push(option);
    return await poll.save();
  }

  async removeOption(id, optionId) {
    const poll = await Poll.findById(id);
    if (!poll) throw ErrorResponse.NotFound('Poll not found');
    poll.options = poll.options.filter(opt => opt._id.toString() !== optionId);
    return await poll.save();
  }
}

export default PollService;
