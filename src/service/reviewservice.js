import Review from '../models/review.model.js';
import ErrorResponse from '../handler/error.response.js';

class ReviewService { 
  async getAllBooks() {
    return await Book.find();
  }

  async getBookById(id) {
    return await Book.findById(id);
  }

  async createReview(rvData) {
    const review = new Review(rvData);
    return await review.save();
  }
}
export default ReviewService;
