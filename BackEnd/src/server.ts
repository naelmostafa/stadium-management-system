import express, { Request, Response } from 'express';
import cors from 'cors';
import { logger } from './config';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// adding cors middleware
app.use(cors());

// adding body parser middleware
app.use(express.json());

app.listen(3030, () => {
  logger.info('Server started at http://localhost:3030');
  logger.info('Press CTRL-C to stop\n');
});
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
