import { Review } from '../../models';
import { TempReviewRepository } from '../temp-review-repository';
describe('TempReviewRepositoryTest', () => {
  const repository = new TempReviewRepository();

  const review: Review = {
    id: 'id',
    name: 'name',
    petName: 'petName',
    rating: 5,
    comments: 'comments',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  };

  describe('create', () => {
    it('should be able to add review', async () => {
      //Given

      //When
      const result = await repository.create(review);

      //Then
      expect(result).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should be able to return all reviews from storage', async () => {
      //Given
      //When
      await repository.create(review);

      const result = await repository.findAll();
      //Then
      expect(result).toEqual([review]);
    });
  });
});
