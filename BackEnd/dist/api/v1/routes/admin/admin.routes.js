"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const config_1 = require("../../../../config");
const admin_controller_1 = require("../../controllers/admin/admin.controller");
class AdminRoutes {
    constructor() {
        this.adminController = new admin_controller_1.AdminController();
    }
    routes(app) {
        app
            .route(AdminRoutes.ADMIN_ROUTE + 'login')
            .post(this.adminController.login.bind(this.adminController));
        // create a new admin all admin fields must be in body of request
        app
            .route(AdminRoutes.ADMIN_ROUTE + 'add-admin')
            .post(this.adminController.addAdmin.bind(this.adminController));
        // create a new employee all admin fields must be in body of request
        app
            .route(AdminRoutes.ADMIN_ROUTE + 'add-employee')
            .post(this.adminController.addEmployee.bind(this.adminController));
        // get all emolyees
        app
            .route(AdminRoutes.ADMIN_ROUTE + 'employees')
            .get(this.adminController.getAllEmployees.bind(this.adminController));
        // get all customers
        app
            .route(AdminRoutes.ADMIN_ROUTE + 'customers')
            .get(this.adminController.getAllCustomers.bind(this.adminController));
        // get revenue for all past dates
        app
            .route(AdminRoutes.ADMIN_ROUTE + 'revenue')
            .get(this.adminController.getRevnueForPastDates.bind(this.adminController));
    }
}
exports.AdminRoutes = AdminRoutes;
AdminRoutes.ADMIN_ROUTE = config_1.AppConstants.API_PREFIX + 'admin/';
