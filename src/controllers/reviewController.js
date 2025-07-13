import SuccessResponse from '../handler/succes.response.js';
import ErrorResponse from '../handler/error.response.js';
import ReviewService from '../service/reviewservice.js';

class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  // Vote một option trong poll
  review = async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const { option, comment } = req.body;
      const userId = req.userId;
      const rvData = { bookId, userId, option, comment };
      
      const newReview = await this.reviewService.createReview(rvData);
      
      SuccessResponse.Created(newReview, 'Review thành công').send(res);
    } catch (error) {
      next(error); // Hoặc xử lý lỗi theo cách của bạn
    }
  }
}

const reviewController = new ReviewController(new ReviewService());
export const {
  review,
} = reviewController;