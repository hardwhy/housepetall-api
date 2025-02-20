import { Review } from '../models/review';

export function validateReviewData(data: Partial<Review>): string | null {
  const { name, petName, rating, comments } = data;

  if (!name || !petName || rating === undefined) {
    return 'Missing required fields. Name, pet name, and rating are required.';
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return 'Rating must be an integer between 1 and 5';
  }

  if (typeof name !== 'string' || typeof petName !== 'string') {
    return 'Name and pet name must be strings';
  }

  return null;
}
