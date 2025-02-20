import { Review } from '../../models';
import { TempReviewRepository} from '../temp-review-repository';
describe('TempReviewRepositoryTest', () => {
    const repository = new TempReviewRepository();
    describe('create', () => { 
        it('should be able to add review', () => {
          //Given
          const review: Review = {
            id: 'id',
            name: 'name',
            petName: 'petName',
            rating: 5,
            comments: 'comments',
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
          };

            //When
            const result = repository.create(review);
            expect(result).toEqual(result);
        });
   })
});
