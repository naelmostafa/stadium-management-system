import express from 'express';
import { AppConstants } from '../../../../config';
import { AdminController } from '../../controllers/admin/admin.controller';

export class AdminRoutes {
  private adminController: AdminController;
  private static ADMIN_ROUTE: string =
    AppConstants.API_PREFIX + 'admin/';

  constructor() {
    this.adminController = new AdminController();
  }

  public routes(app: express.Application): void {
    app
      .route(AdminRoutes.ADMIN_ROUTE + 'login')
      .post(
        this.adminController.login.bind(
          this.adminController
        )
      );

    // create a new admin all admin fields must be in body of request
    app
      .route(AdminRoutes.ADMIN_ROUTE + 'add-admin')
      .post(
        this.adminController.addAdmin.bind(
          this.adminController
        )
      );

    // create a new employee all admin fields must be in body of request
    app
      .route(AdminRoutes.ADMIN_ROUTE + 'add-employee')
      .post(
        this.adminController.addEmployee.bind(
          this.adminController
        )
      );

    // get all emolyees
    app
      .route(AdminRoutes.ADMIN_ROUTE + 'employees')
      .get(
        this.adminController.getAllEmployees.bind(
          this.adminController
        )
      );

    // get all customers
    app
      .route(AdminRoutes.ADMIN_ROUTE + 'customers')
      .get(
        this.adminController.getAllCustomers.bind(
          this.adminController
        )
      );

    // get revenue for all past dates
    app
      .route(AdminRoutes.ADMIN_ROUTE + 'revenue')
      .get(
        this.adminController.getRevnueForPastDates.bind(
          this.adminController
        )
      );
  }
}

