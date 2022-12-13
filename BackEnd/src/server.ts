import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// adidng cors middleware
app.use(cors());

// adding body parser middleware
app.use(express.json());


app.listen(3030, () => {
  console.log(`Example app listening at http://localhost:3030`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


export default app;
