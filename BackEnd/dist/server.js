"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const app = (0, express_1.default)();
exports.app = app;
// adding cors middleware
app.use((0, cors_1.default)());
// adding json middleware
app.use(express_1.default.json());
// adding url encoded middleware
app.use(express_1.default.urlencoded({ extended: true }));
// adding routes
const routes_1 = require("./api/v1/routes");
const reservation_routes_1 = require("./api/v1/routes/reservation/reservation.routes");
const admin_routes_1 = require("./api/v1/routes/admin/admin.routes");
const customerRoutes = new routes_1.CustomerRoutes();
const stadiumRoutes = new routes_1.StadiumRoutes();
const reservationRoutes = new reservation_routes_1.ReservationRoutes();
const adminRoutes = new admin_routes_1.AdminRoutes();
customerRoutes.routes(app);
stadiumRoutes.routes(app);
reservationRoutes.routes(app);
adminRoutes.routes(app);
// log available routes with method and path
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        config_1.logger.info(`${Object.keys(r.route.methods)} ${r.route.path}`);
    }
});
// start the Express server
app.listen(config_1.AppConstants.PORT, () => {
    config_1.logger.info(`server started at http://localhost:${config_1.AppConstants.PORT}`);
});
