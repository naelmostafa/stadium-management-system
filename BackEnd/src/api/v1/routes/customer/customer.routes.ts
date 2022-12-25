import express from 'express';
import { CustomerAuthController } from '../../controllers';

class CustomerRoutes {
  private customerAuth: CustomerAuthController;

  constructor() {
    this.customerAuth = new CustomerAuthController();
  }

  public routes(app: express.Application): void {
    app.route('/api/v1/customer/login').post(this.customerAuth.login);
    app.route('/api/v1/customer/register').post(this.customerAuth.register);
    // dummy routes for testing
    app.route('/api/v1/customer/test').post(this.customerAuth.testPost);
    app.route('/api/v1/customer/test').get(this.customerAuth.testGet);

  }
}

export { CustomerRoutes };