"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = exports.StadiumRoutes = exports.CustomerRoutes = void 0;
var customer_routes_1 = require("./customer/customer.routes");
Object.defineProperty(exports, "CustomerRoutes", { enumerable: true, get: function () { return customer_routes_1.CustomerRoutes; } });
var stadium_routes_1 = require("./stadium/stadium.routes");
Object.defineProperty(exports, "StadiumRoutes", { enumerable: true, get: function () { return stadium_routes_1.StadiumRoutes; } });
var admin_routes_1 = require("./admin/admin.routes");
Object.defineProperty(exports, "AdminRoutes", { enumerable: true, get: function () { return admin_routes_1.AdminRoutes; } });
