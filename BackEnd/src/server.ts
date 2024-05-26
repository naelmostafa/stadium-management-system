import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { AppConstants, logger } from './config';

const app = express();
// adding cors middleware
app.use(cors());
// adding json middleware
app.use(express.json());
// adding url encoded middleware
app.use(express.urlencoded({ extended: true }));

// adding routes
import { CustomerRoutes, StadiumRoutes } from './api/v1/routes';
import { ReservationRoutes } from './api/v1/routes/reservation/reservation.routes';
import {AdminRoutes} from './api/v1/routes/admin/admin.routes';

const customerRoutes: CustomerRoutes = new CustomerRoutes();
const stadiumRoutes: StadiumRoutes = new StadiumRoutes();
const reservationRoutes: ReservationRoutes = new ReservationRoutes();
const adminRoutes: AdminRoutes = new AdminRoutes();

customerRoutes.routes(app);
stadiumRoutes.routes(app);
reservationRoutes.routes(app);
adminRoutes.routes(app);
// log available routes with method and path
app._router.stack.forEach((r: any) => {
  if (r.route && r.route.path) {
    logger.info(`${Object.keys(r.route.methods)} ${r.route.path}`);
  }
});

// start the Express server
app.listen(AppConstants.PORT, () => {
  logger.info(`server started at http://localhost:${AppConstants.PORT}`);
});

export { app };