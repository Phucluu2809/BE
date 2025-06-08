import Poll from '../models/poll.model.js';

class PollService {
  constructor() {
    this.pollModel = Poll;
  }

  // Get all polls
  async getAllPolls() {
    try {
      console.log('Getting all polls...'); // Debug log
      const polls = await this.pollModel.find()
        .populate('creator', 'username')
        .populate('options.userVotes', 'username')
        .sort({ createdAt: -1 }); // Sort by newest first
      
      console.log('Polls found:', polls); // Debug log
      return polls;
    } catch (error) {
      console.error('Error in getAllPolls:', error); // Error log
      throw new Error('Error fetching polls: ' + error.message);
    }
  }

  // Get poll by ID
  async getPollById(pollId) {
    try {
      const poll = await this.pollModel.findById(pollId)
        .populate('creator', 'username')
        .populate('options.userVotes', 'username');
      
      if (!poll) {
        return null;
      }
      
      return poll;
    } catch (error) {
      throw new Error('Error fetching poll: ' + error.message);
    }
  }

  // Create new poll
  async createPoll(pollData) {
    try {
      console.log('Creating poll with data:', pollData); // Debug log
      const poll = new this.pollModel({
        title: pollData.title,
        description: pollData.description,
        creator: pollData.creator,
        options: pollData.options.map(option => ({
          text: option.text,
          votes: 0,
          userVotes: []
        })),
        isLocked: false,
        expiresAt: pollData.endDate
      });
      
      const savedPoll = await poll.save();
      console.log('Poll created successfully:', savedPoll); // Debug log
      return savedPoll;
    } catch (error) {
      console.error('Error creating poll:', error); // Error log
      throw new Error('Error creating poll: ' + error.message);
    }
  }

  // Update poll
  async updatePoll(id, updateData) {
    try {
      const poll = await this.pollModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      return poll;
    } catch (error) {
      throw new Error('Error updating poll: ' + error.message);
    }
  }

  // Delete poll
  async deletePoll(id) {
    try {
      const result = await this.pollModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      throw new Error('Error deleting poll: ' + error.message);
    }
  }

  // Update poll status (lock/unlock)
  async updatePollStatus(id, isLocked) {
    try {
      const poll = await this.pollModel.findByIdAndUpdate(
        id,
        { isLocked },
        { new: true }
      );
      return poll;
    } catch (error) {
      throw new Error('Error updating poll status: ' + error.message);
    }
  }

  // Add option to poll
  async addOption(id, option) {
    try {
      const poll = await this.pollModel.findById(id);
      if (!poll) return null;

      poll.options.push({
        text: option.text,
        votes: 0,
        userVotes: []
      });

      return await poll.save();
    } catch (error) {
      throw new Error('Error adding option: ' + error.message);
    }
  }

  // Remove option from poll
  async removeOption(id, optionId) {
    try {
      const poll = await this.pollModel.findById(id);
      if (!poll) return null;

      poll.options = poll.options.filter(opt => opt._id.toString() !== optionId);
      return await poll.save();
    } catch (error) {
      throw new Error('Error removing option: ' + error.message);
    }
  }
}

// Create instance and export
const pollService = new PollService();
export default pollService;
