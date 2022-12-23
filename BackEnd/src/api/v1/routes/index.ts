import express from 'express';
import CustomerRoutes from './customer';
import StadiumRoutes from './stadium';

const routes = express.Router();

routes.use('/customers', CustomerRoutes);
routes.use('/stadiums', StadiumRoutes);

export default routes;
