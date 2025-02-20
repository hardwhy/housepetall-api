import { setupReviewControllerInjection } from '../setup-injection';
import { Router } from 'express';

export function setupReviewRoutes(): Router {
  const router = Router();
  const controller = setupReviewControllerInjection();

  router.get('/', (req, res) => controller.getAllReviews(req, res));
  router.post('/create', (req, res) => {
    return controller.submitReview(req, res);
  });

  return router;
}
