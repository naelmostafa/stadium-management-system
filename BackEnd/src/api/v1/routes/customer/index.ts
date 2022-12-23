import express from 'express';
import CustomerAuthRoutes from './customer_auth';

const routes = express.Router();
routes.use('/', CustomerAuthRoutes);

export default routes;
