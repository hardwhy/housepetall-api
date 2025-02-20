import { IReviewService } from '../services/interfaces/i-review-service';
import { Request, Response } from 'express';

export class ReviewController {
  constructor(private reviewService: IReviewService) {}

  async submitReview(req: Request, res: Response): Promise<void> {
    try {
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
}
