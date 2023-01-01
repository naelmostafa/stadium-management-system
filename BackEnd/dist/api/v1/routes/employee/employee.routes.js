"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationRoutes = void 0;
const config_1 = require("../../../../config");
const employee_auth_controller_1 = require("../../controllers/employee/employee_auth.controller");
class EmployeeRoutes {
    constructor() {
        this.employeeController = new employee_auth_controller_1.EmployeeController();
    }
    routes(app) {
        app
            .route(EmployeeRoutes.EMPLOYEE_ROUTE + 'login')
            .post(this.employeeController.login.bind(this.employeeController));
    }
}
exports.ReservationRoutes = EmployeeRoutes;
EmployeeRoutes.EMPLOYEE_ROUTE = config_1.AppConstants.API_PREFIX + 'employee/';
