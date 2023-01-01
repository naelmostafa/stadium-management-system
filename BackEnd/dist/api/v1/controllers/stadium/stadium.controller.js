"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StadiumController = void 0;
const config_1 = require("../../../../config");
const models_1 = require("../../models");
class StadiumController {
    constructor() {
        this.stadiumModel = new models_1.StadiumModel();
    }
    async getAllStadiums(req, res) {
        try {
            const stadiums = await this.stadiumModel.getAllStadiums();
            res.status(config_1.StatusCodes.OK).json({
                status: config_1.StatusCodes.OK,
                message: config_1.ResponseMessages.GET_STADIUMS_SUCCESS,
                data: stadiums,
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
    async getAvailableStadiums(req, res) {
        try {
            let reservationDate = req.query.reservation_date;
            let reservationStartTime = req.query.start_time;
            let reservationEndTime = req.query.end_time;
            // validate reservationDate and reservationTime
            if (!(reservationDate && reservationStartTime && reservationEndTime)) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.QUERY_PARAMS_ERROR,
                });
                return;
            }
            reservationDate = reservationDate.toString();
            reservationStartTime = reservationStartTime.toString();
            reservationEndTime = reservationEndTime.toString();
            if (!this.validateTime(reservationDate, reservationStartTime, reservationEndTime)) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.RESERVATION_DATETIME_ERROR,
                });
                return;
            }
            // validate time
            const stadiums = await this.stadiumModel.getAvailableStadiumsByDate(reservationDate, reservationStartTime, reservationEndTime);
            res.status(config_1.StatusCodes.OK).json({
                status: config_1.StatusCodes.OK,
                message: config_1.ResponseMessages.GET_STADIUMS_SUCCESS,
                data: stadiums,
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
    // add new stadium
    async addAvailableStadiums(req, res) {
        /// TODO AUTHENTICATION
        try {
            let stadium = req.body;
            // validate stadium fileds
            if (!this.validateStadium(stadium)) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.NO_BODY_ERROR,
                });
                return;
            }
            stadium = await this.stadiumModel.addStadium(stadium);
            if (stadium) {
                res.status(config_1.StatusCodes.OK).json({
                    status: config_1.StatusCodes.OK,
                    message: config_1.ResponseMessages.GET_STADIUMS_SUCCESS,
                    data: stadium,
                });
                return;
            }
            else {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.OK,
                    message: config_1.ResponseMessages.ERROR,
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
    // update stadium
    async updateStadium(req, res) {
        /// TODO AUTHENTICATION
        try {
            const stadiumId = req.params.id;
            let stadium = req.body;
            // check if stadium id is provided
            // validate stadium fileds
            if (!this.validateStadium(stadium) || !stadiumId || stadiumId < 0) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.BODY_ERROR,
                });
                return;
            }
            stadium = await this.stadiumModel.updateStadium(stadiumId, stadium);
            if (stadium) {
                res.status(config_1.StatusCodes.OK).json({
                    status: config_1.StatusCodes.OK,
                    message: config_1.ResponseMessages.UPDATE_STADIUM_SUCCESS,
                    data: stadium,
                });
                return;
            }
            else {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.OK,
                    message: config_1.ResponseMessages.ERROR,
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
    // delete stadium
    async deleteStadium(req, res) {
        /// TODO AUTHENTICATION
        try {
            const stadiumId = req.params.stadium_id;
            // check if stadium id is provided
            if (!stadiumId || stadiumId < 0) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.QUERY_PARAMS_ERROR,
                });
                return;
            }
            const isDeleted = await this.stadiumModel.deleteStadium(stadiumId);
            if (isDeleted) {
                res.status(config_1.StatusCodes.NO_CONTENT).send();
                return;
            }
            else {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.SERVICE_UNAVAILABLE,
                    message: config_1.ResponseMessages.ERROR,
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
    validateStadium(stadium) {
        if (!stadium.cost_per_hour)
            return false;
        if (!stadium.description)
            return false;
        if (!stadium.location)
            return false;
        if (!stadium.name)
            return false;
        if (!stadium.size)
            return false;
        if (!stadium.stadium_number && stadium.stadium_number < 0)
            return false;
        if (!stadium.status)
            return false;
        return true;
    }
    validateTime(date, startTime, endTime) {
        // validate start_time and end_time
        const dateSplit = date.split('-');
        const year = dateSplit[0];
        const month = dateSplit[1];
        const day = dateSplit[2];
        const startHour = startTime.split(':')[0];
        const startMinute = startTime.split(':')[1];
        const endHour = endTime.split(':')[0];
        const endMinute = endTime.split(':')[1];
        const startTimeD = new Date(year, month - 1, day, startHour, startMinute);
        const endTimeD = new Date(year, month - 1, day, endHour, endMinute);
        if (startTimeD.getTime() >= endTimeD.getTime()) {
            return false;
        }
        // validate date
        const dateD = new Date(date + 'T' + startTime);
        if (dateD.getTime() <= new Date().getTime()) {
            return false;
        }
        return true;
    }
}
exports.StadiumController = StadiumController;
