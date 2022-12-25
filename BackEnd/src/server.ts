import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { logger } from './config';
import { PORT } from './config';


const app = express();
// adding cors middleware
app.use(cors());
// adding json middleware
app.use(express.json());
// adding url encoded middleware
app.use(express.urlencoded({ extended: true }));

// adding routes
import { CustomerRoutes, StadiumRoutes } from './api/v1/routes';

const customerRoutes = new CustomerRoutes();
const stadiumRoutes = new StadiumRoutes();
customerRoutes.routes(app);
stadiumRoutes.routes(app);

// log available routes with method and path
app._router.stack.forEach((r: any) => {
  if (r.route && r.route.path) {
    logger.info(`${Object.keys(r.route.methods)} ${r.route.path}`);
  }
});

// start the Express server
app.listen(PORT, () => {
  logger.info(`server started at http://localhost:${PORT}`);

});
