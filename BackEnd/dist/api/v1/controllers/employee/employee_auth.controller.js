"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const config_1 = require("../../../../config");
const models_1 = require("../../models");
class EmployeeController {
    constructor() {
        this.employeeModel = new models_1.EmployeeModel();
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            // validate email and password
            if (!(email && password)) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.LOGIN_BODY_ERROR,
                });
                return;
            }
            const employee = await this.employeeModel.login(email, password);
            if (employee) {
                res.status(config_1.StatusCodes.OK).json({
                    status: config_1.StatusCodes.OK,
                    message: config_1.ResponseMessages.LOGIN_SUCCESS,
                    data: employee,
                });
                return;
            }
            else {
                res.status(config_1.StatusCodes.UNAUTHORIZED).json({
                    status: config_1.StatusCodes.UNAUTHORIZED,
                    message: config_1.ResponseMessages.LOGIN_UNAUTHORIZED,
                });
                return;
            }
        }
        catch (err) {
            const errorMessage = err?.message ?? config_1.ResponseMessages.ERROR;
            res.status(config_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: config_1.StatusCodes.INTERNAL_SERVER_ERROR,
                message: errorMessage,
            });
        }
    }
}
exports.EmployeeController = EmployeeController;
