"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAuthController = void 0;
const config_1 = require("../../../../config");
const models_1 = require("../../models");
const utils_1 = require("../../utils");
class CustomerAuthController {
    async login(req, res) {
        const customerModel = new models_1.CustomerModel();
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
            const customer = await customerModel.login(email, password);
            if (customer !== null) {
                res.status(config_1.StatusCodes.OK).json({
                    status: config_1.StatusCodes.OK,
                    message: config_1.ResponseMessages.LOGIN_SUCCESS,
                    data: customer,
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
    async register(req, res) {
        try {
            // check if body is valid and has email and password
            const email = req.body.email;
            const password = req.body.password;
            const name = req.body.name;
            const phone = req.body.phone;
            if (!this.validateRegisterBody(email, password, name, phone)) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.REGISTER_BODY_ERROR,
                });
                return;
            }
            const customerModel = new models_1.CustomerModel();
            const customer = await customerModel.register(name, email, password, phone);
            if (customer) {
                res.status(config_1.StatusCodes.OK).json({
                    status: config_1.StatusCodes.OK,
                    message: config_1.ResponseMessages.REGISTER_SUCCESS,
                    data: customer,
                });
            }
            else {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.REGISTER_FAILED,
                });
            }
        }
        catch (err) {
            console.log(err);
            const errorMessage = err?.message ?? config_1.ResponseMessages.ERROR;
            res.status(config_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: config_1.StatusCodes.INTERNAL_SERVER_ERROR,
                message: errorMessage,
            });
        }
    }
    // test dummy model
    async testGet(req, res) {
        const customerModel = new models_1.CustomerModel();
        try {
            const customer = await customerModel.testGet();
            if (customer) {
                res.status(config_1.StatusCodes.OK).json({
                    status: config_1.StatusCodes.OK,
                    message: config_1.ResponseMessages.REGISTER_SUCCESS,
                    data: customer,
                });
            }
            else {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.REGISTER_FAILED,
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
    async testPost(req, res) {
        const customerModel = new models_1.CustomerModel();
        try {
            const customer = await customerModel.testPost(req.body.username, req.body.password);
            if (customer) {
                res.status(config_1.StatusCodes.OK).json({
                    status: config_1.StatusCodes.OK,
                    message: config_1.ResponseMessages.REGISTER_SUCCESS,
                    data: customer,
                });
            }
            else {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.REGISTER_FAILED,
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
    validateRegisterBody(email, password, name, phone) {
        if (!(email && password && name && phone)) {
            return false;
        }
        if (!utils_1.HelperFunction.validateEmail(email)) {
            return false;
        }
        // validayte password length
        if (password.length < 6) {
            return false;
        }
        // validate name length
        if (name.trim().length == 0) {
            return false;
        }
        return true;
    }
}
exports.CustomerAuthController = CustomerAuthController;
