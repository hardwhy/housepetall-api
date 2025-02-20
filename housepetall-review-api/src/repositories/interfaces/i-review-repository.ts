import { Review } from '../../models';

export interface IReviewRepository {
  create(review: Review): Promise<Review>;
  findAll(): Promise<Review[]>;
}
