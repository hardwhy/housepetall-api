import { Review } from '../models/review';

export function validateReviewData(data: Partial<Review>): string | null {
  const { name, petName, rating, comments } = data;

  if (!name || !petName || rating === undefined) {
    return 'Missing required fields. Name, pet name, and rating are required.';
  }

  return null;
}
