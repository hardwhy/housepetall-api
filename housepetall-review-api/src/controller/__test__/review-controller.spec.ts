import { Review } from '../../models/review';
import { IReviewService } from '../../services/interfaces/i-review-service';
import { ReviewController } from '../review-controller';
import { Request, Response } from 'express';

describe('ReviewController', () => {
  const reviewService: IReviewService = {
    getAllReviews: jest.fn(),
    submitReview: jest.fn(),
  };

  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  const controller = new ReviewController(reviewService);

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

  beforeEach(() => {
    mockRequest = {
      body: review,
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('submitReview', () => {
    it('should return 201 when success', async () => {
      //Given
      reviewService.submitReview = jest
        .fn()
        .mockResolvedValue(reviewWithCreatedAt);
      //When
      await controller.submitReview(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(reviewService.submitReview).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Review submitted successfully',
        review: reviewWithCreatedAt,
      });
    });

    it('should return 500 if an error occurs', async () => {
      //Given
      const mockError = new Error('Database error');
      reviewService.submitReview = jest.fn().mockRejectedValue(mockError);

      //When
      await controller.submitReview(
        mockRequest as Request,
        mockResponse as Response
      );

      //Then
      expect(reviewService.submitReview).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Internal server error',
        details: 'Database error',
      });
    });

    it('should return 400 if request body missing required field', async () => {
      //Given
      const { name, ...rest } = review;
      console.log('removed item', name);

      mockRequest = { body: rest };

      //When
      await controller.submitReview(
        mockRequest as Request,
        mockResponse as Response
      );

      //Then
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error:
          'Missing required fields. Name, pet name, and rating are required.',
      });
    });

    it('should return 400 if rating missed matching the data type', async () => {
      //Given
      mockRequest = { body: { ...mockRequest.body, rating: '4' } };

      //When
      await controller.submitReview(
        mockRequest as Request,
        mockResponse as Response
      );

      //Then
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Rating must be an integer between 1 and 5',
      });
    });

    it('should return 400 if owner petname missed matching the data type', async () => {
      //Given
      mockRequest = { body: { ...mockRequest.body, petName: 112 } };

      //When
      await controller.submitReview(
        mockRequest as Request,
        mockResponse as Response
      );

      //Then
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Name and pet name must be strings',
      });
    });

    it('should return 400 if owner name missed matching the data type', async () => {
      //Given
      mockRequest = { body: { ...mockRequest.body, name: 112 } };

      //When
      await controller.submitReview(
        mockRequest as Request,
        mockResponse as Response
      );

      //Then
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Name and pet name must be strings',
      });
    });

    it('should return 400 if comment missed matching the data type', async () => {
      //Given
      mockRequest = { body: { ...mockRequest.body, comments: 112 } };

      //When
      await controller.submitReview(
        mockRequest as Request,
        mockResponse as Response
      );

      //Then
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Comments must be a string',
      });
    });
  });
});
