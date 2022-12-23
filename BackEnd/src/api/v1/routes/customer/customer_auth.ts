import { CustomerModel } from "../../models";
import express from "express";
import {CustomerAuthController} from "../../controllers/customer/customer_auth_controller";

const routes = express.Router();

const customerAuthController = new CustomerAuthController();


routes.post('/login', customerAuthController.login);
routes.post('/register', customerAuthController.register);
export default routes;


