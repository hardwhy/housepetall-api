import { ReviewController } from './controller/review-controller';
import { TempReviewRepository } from './repositories/temp-review-repository';
import { ReviewService } from './services/review-service';

export const setupReviewControllerInjection = () => {
  const reviewRepository = new TempReviewRepository();
  const reviewService = new ReviewService(reviewRepository);
  const reviewController = new ReviewController(reviewService);
  return reviewController;
};
