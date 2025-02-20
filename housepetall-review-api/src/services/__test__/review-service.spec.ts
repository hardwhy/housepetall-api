import { Review } from '../../models/review';
import { IReviewRepository } from '../../repositories/interfaces/i-review-repository';
import { ReviewService } from '../review-service';

describe('ReviewService Test', () => {
  const reviewRepository: IReviewRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const service = new ReviewService(reviewRepository);

  const createdAt = new Date().toISOString().split('T')[0];
  const review: Review = {
    id: 'id',
    name: 'name',
    petName: 'petName',
    rating: 5,
    comments: 'comments',
  };

  const reviewWithCreatedAt: Review = {
    ...review,
    createdAt: createdAt,
    updatedAt: createdAt,
  };

  describe('submitReview', () => {
    it('should return submitted review', async () => {
      //Given
      reviewRepository.create = jest
        .fn()
        .mockResolvedValue(reviewWithCreatedAt);
      //When
      const result = await service.submitReview(review);

      expect(result).toEqual(reviewWithCreatedAt);
      expect(result.createdAt).toEqual(createdAt);
      expect(result.updatedAt).toEqual(createdAt);
      expect(reviewRepository.create).toHaveBeenCalled();
      expect(result).toMatchSnapshot();
    });
  });
  describe('getAllReviews', () => {
    it('should return all created review', async () => {
      //Given
      reviewRepository.findAll = jest
        .fn()
        .mockResolvedValue([reviewWithCreatedAt]);

      //When
      const result = await service.getAllReviews();

      expect(result).toEqual([reviewWithCreatedAt]);
      expect(result.length).toEqual(1);
      expect(reviewRepository.findAll).toHaveBeenCalled();
      expect(result).toMatchSnapshot();
    });
  });
});
