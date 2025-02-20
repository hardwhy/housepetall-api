import express from 'express';
import { setupReviewRoutes } from './routes/review-routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use('/reviews', setupReviewRoutes());

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
