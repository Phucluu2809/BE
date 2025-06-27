import SuccessResponse from '../handler/succes.response.js';
import ErrorResponse from '../handler/error.response.js';
import PollService from '../service/poll.service.js';

class PollController {
  constructor(pollService) {
    this.pollService = pollService;
  }

  getAllPolls = async (req, res, next) => {
    const polls = await this.pollService.getAllPolls();
    SuccessResponse.OK(polls, 'Polls retrieved successfully').send(res);
  };

  getPollById = async (req, res, next) => {
    const { id } = req.params;
    const poll = await this.pollService.getPollById(id);
    if (!poll) throw ErrorResponse.NotFound('Poll not found');
    SuccessResponse.OK(poll, 'Poll retrieved successfully').send(res);
  };

  createPoll = async (req, res, next) => {
    const pollData = req.body;
    const newPoll = await this.pollService.createPoll(pollData);
    SuccessResponse.Created(newPoll, 'Poll created successfully').send(res);
  };

  updatePoll = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedPoll = await this.pollService.updatePoll(id, updateData);
    if (!updatedPoll) throw ErrorResponse.NotFound('Poll not found');
    SuccessResponse.OK(updatedPoll, 'Poll updated successfully').send(res);
  };

  deletePoll = async (req, res, next) => {
    const { id } = req.params;
    const deleted = await this.pollService.deletePoll(id);
    if (!deleted) throw ErrorResponse.NotFound('Poll not found');
    SuccessResponse.OK(null, 'Poll deleted successfully').send(res);
  };

  lockPoll = async (req, res, next) => {
    const { id } = req.params;
    const poll = await this.pollService.updatePollStatus(id, false);
    if (!poll) throw ErrorResponse.NotFound('Poll not found');
    SuccessResponse.OK(poll, 'Poll locked successfully').send(res);
  };

  unlockPoll = async (req, res, next) => {
    const { id } = req.params;
    const poll = await this.pollService.updatePollStatus(id, true);
    if (!poll) throw ErrorResponse.NotFound('Poll not found');
    SuccessResponse.OK(poll, 'Poll unlocked successfully').send(res);
  };

  addOption = async (req, res, next) => {
    const { id } = req.params;
    const { option } = req.body;
    const updatedPoll = await this.pollService.addOption(id, option);
    if (!updatedPoll) throw ErrorResponse.NotFound('Poll not found');
    SuccessResponse.OK(updatedPoll, 'Option added successfully').send(res);
  };

  removeOption = async (req, res, next) => {
    const { id, optionId } = req.params;
    const updatedPoll = await this.pollService.removeOption(id, optionId);
    if (!updatedPoll) throw ErrorResponse.NotFound('Poll or option not found');
    SuccessResponse.OK(updatedPoll, 'Option removed successfully').send(res);
  };
}

const pollController = new PollController(new PollService());
export const {
  getAllPolls,
  getPollById,
  createPoll,
  updatePoll,
  deletePoll,
  lockPoll,
  unlockPoll,
  addOption,
  removeOption,
} = pollController;
