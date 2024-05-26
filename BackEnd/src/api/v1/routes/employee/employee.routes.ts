import express from 'express';
import { AppConstants } from '../../../../config';
import { EmployeeController } from '../../controllers/employee/employee_auth.controller';

class EmployeeRoutes {
  private employeeController: EmployeeController;
  private static EMPLOYEE_ROUTE: string =
    AppConstants.API_PREFIX + 'employee/';

  constructor() {
    this.employeeController = new EmployeeController();
  }

  public routes(app: express.Application): void {
    app
      .route(EmployeeRoutes.EMPLOYEE_ROUTE + 'login')
      .post(
        this.employeeController.login.bind(
          this.employeeController
        )
      );
  }
}

export { EmployeeRoutes as ReservationRoutes };
