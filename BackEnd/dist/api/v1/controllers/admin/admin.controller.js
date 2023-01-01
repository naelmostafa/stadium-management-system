"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const models_1 = require("../../models");
const config_1 = require("../../../../config");
const utils_1 = require("../../utils");
class AdminController {
    constructor() {
        this.adminModel = new models_1.AdminModel();
        this.customerModel = new models_1.CustomerModel();
        this.employeeModel = new models_1.EmployeeModel();
        this.reservationModel = new models_1.ReservationModel();
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            // validate email and password
            if (!(email && password) || !utils_1.HelperFunction.validateEmail(email) || password.length < 6) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.LOGIN_BODY_ERROR,
                });
                return;
            }
            const admin = await this.adminModel.adminLogin(email, password);
            if (admin) {
                res.status(config_1.StatusCodes.OK).json({
                    status: config_1.StatusCodes.OK,
                    message: config_1.ResponseMessages.LOGIN_SUCCESS,
                    data: admin,
                });
                return;
            }
            else {
                res.status(config_1.StatusCodes.UNAUTHORIZED).json({
                    status: config_1.StatusCodes.UNAUTHORIZED,
                    message: config_1.ResponseMessages.LOGIN_UNAUTHORIZED,
                });
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
    // add new admin
    async addAdmin(req, res) {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const phone = req.body.phone_number;
            // validate Admin data
            if (!this.validateUser(name, email, password, phone)) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.REGISTER_BODY_ERROR,
                });
                return;
            }
            const newAdmin = await this.adminModel.addNewAdmin(name, email, password, phone);
            res.status(config_1.StatusCodes.OK).json({
                status: config_1.StatusCodes.OK,
                message: config_1.ResponseMessages.REGISTER_SUCCESS,
                data: newAdmin
            });
            return;
        }
        catch (err) {
            const errorMessage = err?.message ?? config_1.ResponseMessages.ERROR;
            res.status(config_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: config_1.StatusCodes.INTERNAL_SERVER_ERROR,
                message: errorMessage,
            });
        }
    }
    // add new employee
    async addEmployee(req, res) {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const phone = req.body.phone_number;
            const ssn = req.body.ssn;
            const salary = req.body.salary;
            // validate Admin data
            if (!this.validateEmployee(name, email, password, phone, ssn, salary)) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.REGISTER_BODY_ERROR,
                });
                return;
            }
            const newEmployee = await this.employeeModel.registerEmployee(name, email, password, phone, ssn, salary);
            res.status(config_1.StatusCodes.OK).json({
                status: config_1.StatusCodes.OK,
                message: config_1.ResponseMessages.REGISTER_SUCCESS,
                data: newEmployee
            });
            return;
        }
        catch (err) {
            const errorMessage = err?.message ?? config_1.ResponseMessages.ERROR;
            res.status(config_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: config_1.StatusCodes.INTERNAL_SERVER_ERROR,
                message: errorMessage,
            });
        }
    }
    async getAllEmployees(req, res) {
        try {
            const employees = await this.employeeModel.getAllEmployees();
            res.status(config_1.StatusCodes.OK).json({
                status: config_1.StatusCodes.OK,
                message: config_1.ResponseMessages.REGISTER_SUCCESS,
                data: employees
            });
            return;
        }
        catch (err) {
            const errorMessage = err?.message ?? config_1.ResponseMessages.ERROR;
            res.status(config_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: config_1.StatusCodes.INTERNAL_SERVER_ERROR,
                message: errorMessage,
            });
        }
    }
    async getAllCustomers(req, res) {
        try {
            const customers = await this.customerModel.getAllCustomers();
            res.status(config_1.StatusCodes.OK).json({
                status: config_1.StatusCodes.OK,
                message: config_1.ResponseMessages.CUSTOMERS_FETCHED,
                data: customers
            });
            return;
        }
        catch (err) {
            const errorMessage = err?.message ?? config_1.ResponseMessages.ERROR;
            res.status(config_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: config_1.StatusCodes.INTERNAL_SERVER_ERROR,
                message: errorMessage,
            });
        }
    }
    async getRevnueForPastDates(req, res) {
        try {
            const revenue = await this.reservationModel.getRevenueForPastDays();
            res.status(config_1.StatusCodes.OK).json({
                status: config_1.StatusCodes.OK,
                message: config_1.ResponseMessages.GET_REVENUE_SUCCESS,
                data: revenue,
            });
        }
        catch (err) {
            const errorMessage = err?.message ?? config_1.ResponseMessages.ERROR;
            res.status(config_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: config_1.StatusCodes.INTERNAL_SERVER_ERROR,
                message: errorMessage,
            });
        }
    }
    validateUser(name, email, password, phone) {
        if (!email || !name || !password || !phone) {
            return false;
        }
        if (name.length === 0 || phone.length === 0) {
            return false;
        }
        if (password.length < 6)
            return false;
        if (!utils_1.HelperFunction.validateEmail(email))
            return false;
        return true;
    }
    validateEmployee(name, email, password, phone, ssn, salary) {
        if (!this.validateUser(name, email, password, phone))
            return false;
        if (!ssn || ssn.length !== 10)
            return false;
        if (!salary || isNaN(salary))
            return false;
        return true;
    }
}
exports.AdminController = AdminController;
