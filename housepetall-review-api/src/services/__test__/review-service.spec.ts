import { Review } from '../../models/review';
import { IReviewRepository } from '../../repositories/interfaces/i-review-repository';
import { ReviewService } from '../review-service';

describe('ReviewService Test', () => {
  const reviewRepository: IReviewRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const service = new ReviewService(reviewRepository);
  describe('submitReview', () => {
    const createdAt = new Date().toISOString().split('T')[0];
    const review: Review = {
      id: 'id',
      name: 'name',
      petName: 'petName',
      rating: 5,
      comments: 'comments',
    };
    it('should return submitted review', async () => {
        //Given
        const reviewWithCreatedAt: Review = { ...review, createdAt: createdAt, updatedAt: createdAt };
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
});
