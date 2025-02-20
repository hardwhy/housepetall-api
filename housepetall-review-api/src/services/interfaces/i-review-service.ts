import { Review } from '../../models/review';

export interface IReviewService {
  submitReview(
    data: Review
  ): Promise<Review>;
}
