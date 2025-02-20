import { Review } from '../models/review';
import { IReviewService } from './interfaces/i-review-service';
import { IReviewRepository } from '../repositories/interfaces/i-review-repository';

export class ReviewService implements IReviewService {
  constructor(private repository: IReviewRepository) {}

  async submitReview(data: Review): Promise<Review> {
    const createdAt = new Date().toISOString().split('T')[0];
    const review: Review = {
      ...data,
      createdAt: createdAt,
      updatedAt: createdAt,
    };

    return await this.repository.create(review);
  }
}
