import SuccessResponse from '../handler/succes.response.js';
import ErrorResponse from '../handler/error.response.js';
import pollService from '../service/poll.service.js';

class PollController {
  constructor() {
    this.pollService = pollService;
  }

  // Get all polls with pagination
  async getAllPolls(req, res) {
    try {
      const polls = await this.pollService.getAllPolls();
      return SuccessResponse.OK(polls, 'Polls retrieved successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error retrieving polls').send(res);
    }
  }

  // Get specific poll by ID
  async getPollById(req, res) {
    try {
      const { id } = req.params;
      const poll = await this.pollService.getPollById(id);
      
      if (!poll) {
        return ErrorResponse.NotFound('Poll not found').send(res);
      }

      return SuccessResponse.OK(poll, 'Poll retrieved successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error retrieving poll').send(res);
    }
  }

  // Create new poll (admin only)
  async createPoll(req, res) {
    try {
      const pollData = req.body;
      const newPoll = await this.pollService.createPoll(pollData);
      return SuccessResponse.Created(newPoll, 'Poll created successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error creating poll').send(res);
    }
  }

  // Update poll (admin only)
  async updatePoll(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedPoll = await this.pollService.updatePoll(id, updateData);

      if (!updatedPoll) {
        return ErrorResponse.NotFound('Poll not found').send(res);
      }

      return SuccessResponse.OK(updatedPoll, 'Poll updated successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error updating poll').send(res);
    }
  }

  // Delete poll (admin only)
  async deletePoll(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.pollService.deletePoll(id);

      if (!deleted) {
        return ErrorResponse.NotFound('Poll not found').send(res);
      }

      return SuccessResponse.OK(null, 'Poll deleted successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error deleting poll').send(res);
    }
  }

  // Lock poll (admin only)
  async lockPoll(req, res) {
    try {
      const { id } = req.params;
      const poll = await this.pollService.updatePollStatus(id, false);

      if (!poll) {
        return ErrorResponse.NotFound('Poll not found').send(res);
      }

      return SuccessResponse.OK(poll, 'Poll locked successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error locking poll').send(res);
    }
  }

  // Unlock poll (admin only)
  async unlockPoll(req, res) {
    try {
      const { id } = req.params;
      const poll = await this.pollService.updatePollStatus(id, true);

      if (!poll) {
        return ErrorResponse.NotFound('Poll not found').send(res);
      }

      return SuccessResponse.OK(poll, 'Poll unlocked successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error unlocking poll').send(res);
    }
  }

  // Add option to poll (admin only)
  async addOption(req, res) {
    try {
      const { id } = req.params;
      const { option } = req.body;
      const updatedPoll = await this.pollService.addOption(id, option);

      if (!updatedPoll) {
        return ErrorResponse.NotFound('Poll not found').send(res);
      }

      return SuccessResponse.OK(updatedPoll, 'Option added successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error adding option').send(res);
    }
  }

  // Remove option from poll (admin only)
  async removeOption(req, res) {
    try {
      const { id, optionId } = req.params;
      const updatedPoll = await this.pollService.removeOption(id, optionId);

      if (!updatedPoll) {
        return ErrorResponse.NotFound('Poll or option not found').send(res);
      }

      return SuccessResponse.OK(updatedPoll, 'Option removed successfully').send(res);
    } catch (error) {
      return ErrorResponse.InternalServer('Error removing option').send(res);
    }
  }
}

// Create instance
const pollController = new PollController();

// Bind methods and export
export default {
  getAllPolls: pollController.getAllPolls.bind(pollController),
  getPollById: pollController.getPollById.bind(pollController),
  createPoll: pollController.createPoll.bind(pollController),
  updatePoll: pollController.updatePoll.bind(pollController),
  deletePoll: pollController.deletePoll.bind(pollController),
  lockPoll: pollController.lockPoll.bind(pollController),
  unlockPoll: pollController.unlockPoll.bind(pollController),
  addOption: pollController.addOption.bind(pollController),
  removeOption: pollController.removeOption.bind(pollController)
}; 