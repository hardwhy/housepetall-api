import { Review } from '../models/review';
import { IReviewRepository } from './interfaces/i-review-repository';

export class TempReviewRepository implements IReviewRepository {
  private storage: Review[] = [];

  async create(review: Review): Promise<Review> {
    this.storage = [review, ...this.storage];
    return review;
  }

  async findAll(): Promise<Review[]> {
    return [...this.storage];
  }
}
