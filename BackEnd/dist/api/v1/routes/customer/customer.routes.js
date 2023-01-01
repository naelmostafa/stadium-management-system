"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const controllers_1 = require("../../controllers");
class CustomerRoutes {
    constructor() {
        this.customerAuth = new controllers_1.CustomerAuthController();
    }
    routes(app) {
        app
            .route('/api/v1/customer/login')
            .post(this.customerAuth.login.bind(this.customerAuth));
        app
            .route('/api/v1/customer/register')
            .post(this.customerAuth.register.bind(this.customerAuth));
        // dummy routes for testing
        app.route('/api/v1/customer/test').post(this.customerAuth.testPost);
        app.route('/api/v1/customer/test').get(this.customerAuth.testGet);
    }
}
exports.CustomerRoutes = CustomerRoutes;
