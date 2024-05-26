"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const config_1 = require("../../../../config");
const models_1 = require("../../models");
class ReservationController {
    constructor() {
        this.reservationModel = new models_1.ReservationModel();
    }
    async addReservation(req, res) {
        try {
            const reservation = req.body;
            // validate reservation
            if (!this.validateReservation(reservation)) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.BODY_ERROR,
                });
                return;
            }
            if (!this.validateReservationTime(reservation)) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.RESERVATION_DATETIME_ERROR,
                });
                return;
            }
            // check if stadium is available
            const isStadiumAvailable = await this.reservationModel.isReservationAvailable(reservation.date, reservation.start_time, reservation.end_time, reservation.stadium_id);
            if (!isStadiumAvailable) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.RESERVATION_CONFLICT,
                });
                return;
            }
            const newReservation = await this.reservationModel.addReservation(reservation);
            res.status(config_1.StatusCodes.CREATED).json({
                status: config_1.StatusCodes.CREATED,
                message: config_1.ResponseMessages.ADD_RESERVATION_SUCCESS,
                data: newReservation,
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
    async getAllReservations(req, res) {
        try {
            const reservations = await this.reservationModel.getAllReservations();
            res.status(config_1.StatusCodes.OK).json({
                status: config_1.StatusCodes.OK,
                message: config_1.ResponseMessages.GET_RESERVATIONS_SUCCESS,
                data: reservations,
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
    async getReservationById(req, res) {
        try {
            const reservationId = req.params.reservation_id;
            // validate reservationId
            if (!reservationId || isNaN(reservationId) || reservationId < 0) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.ID_ERROR,
                });
                return;
            }
            const reservation = await this.reservationModel.getReservationById(reservationId);
            res.status(config_1.StatusCodes.OK).json({
                status: config_1.StatusCodes.OK,
                message: config_1.ResponseMessages.GET_RESERVATIONS_SUCCESS,
                data: reservation,
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
    async updateReservation(req, res) {
        try {
            const reservationId = req.params.reservation_id;
            const reservation = req.body;
            // validate reservationId
            if (!reservationId || isNaN(reservationId) || reservationId < 0) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.ID_ERROR,
                });
                return;
            }
            // validate reservation
            if (!this.validateReservation(reservation)) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.BODY_ERROR,
                });
                return;
            }
            if (!this.validateReservationTime(reservation)) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.RESERVATION_DATETIME_ERROR,
                });
                return;
            }
            // check if stadium is available
            const isStadiumAvailable = await this.reservationModel.isReservationAvailable(reservation.date, reservation.start_time, reservation.end_time, reservation.stadium_id, reservationId);
            if (!isStadiumAvailable) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.RESERVATION_CONFLICT,
                });
                return;
            }
            const updatedReservation = await this.reservationModel.updateReservation(reservationId, reservation);
            res.status(config_1.StatusCodes.OK).json({
                status: config_1.StatusCodes.OK,
                message: config_1.ResponseMessages.UPDATE_RESERVATION_SUCCESS,
                data: updatedReservation,
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
    async deleteReservation(req, res) {
        try {
            const reservationId = req.params.reservation_id;
            // validate reservationId
            if (!reservationId || isNaN(reservationId) || reservationId < 0) {
                res.status(config_1.StatusCodes.BAD_REQUEST).json({
                    status: config_1.StatusCodes.BAD_REQUEST,
                    message: config_1.ResponseMessages.ID_ERROR,
                });
                return;
            }
            const deletedReservation = await this.reservationModel.deleteReservation(reservationId);
            res.status(config_1.StatusCodes.OK).json({
                status: config_1.StatusCodes.OK,
                message: config_1.ResponseMessages.DELETE_RESERVATION_SUCCESS,
                data: deletedReservation,
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
    validateReservation(reservation) {
        if (!reservation) {
            return false;
        }
        if (!reservation.stadium_id ||
            isNaN(reservation.stadium_id) ||
            reservation.stadium_id < 0) {
            return false;
        }
        if (!reservation.customer_id ||
            isNaN(reservation.customer_id) ||
            reservation.customer_id < 0) {
            return false;
        }
        if (!reservation.date) {
            return false;
        }
        if (!reservation.start_time) {
            return false;
        }
        if (!reservation.end_time) {
            return false;
        }
        if (!reservation.deposit || reservation.deposit < 0)
            return false;
        if (!reservation.total_price || reservation.total_price < 0)
            return false;
        if (!reservation.payment_method)
            return false;
        return true;
    }
    validateReservationTime(reservation) {
        // validate start_time and end_time
        const dateSplit = reservation.date.split('-');
        const year = dateSplit[0];
        const month = dateSplit[1];
        const day = dateSplit[2];
        const startHour = reservation.start_time.split(':')[0];
        const startMinute = reservation.start_time.split(':')[1];
        const endHour = reservation.end_time.split(':')[0];
        const endMinute = reservation.end_time.split(':')[1];
        const startTime = new Date(year, month, day, startHour, startMinute);
        const endTime = new Date(year, month, day, endHour, endMinute);
        if (startTime.getTime() >= endTime.getTime()) {
            return false;
        }
        // validate date
        const date = new Date(reservation.date);
        if (date.getTime() < new Date().getTime()) {
            return false;
        }
        return true;
    }
}
exports.ReservationController = ReservationController;
