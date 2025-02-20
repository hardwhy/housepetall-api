import { IReviewService } from '../services/interfaces/i-review-service';
import { validateReviewData } from '../middleware/validator';
import { Request, Response } from 'express';

export class ReviewController {
  constructor(private reviewService: IReviewService) {}

  async submitReview(req: Request, res: Response): Promise<void> {
    try {
      const validationError = validateReviewData(req.body);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      const review = await this.reviewService.submitReview(req.body);
      res.status(201).json({
        message: 'Review submitted successfully',
        review,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getAllReviews(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await this.reviewService.getAllReviews();
      res.status(200).json({
        count: reviews.length,
        reviews,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
