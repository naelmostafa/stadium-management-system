import express from 'express'
import CustomerRoutes from './customer'


const routes = express.Router();

routes.use('/customer', CustomerRoutes);


export default routes;