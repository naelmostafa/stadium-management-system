"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationRoutes = void 0;
const config_1 = require("../../../../config");
const reservation_controller_1 = require("../../controllers/reservation/reservation.controller");
class ReservationRoutes {
    constructor() {
        this.reservationController = new reservation_controller_1.ReservationController();
    }
    routes(app) {
        app
            .route(ReservationRoutes.RESERVAION_ROUTES + 'all')
            .get(this.reservationController.getAllReservations.bind(this.reservationController));
        app
            .route(ReservationRoutes.RESERVAION_ROUTES + ':reservation_id')
            .get(this.reservationController.getReservationById.bind(this.reservationController));
        app
            .route(ReservationRoutes.RESERVAION_ROUTES + 'add')
            .post(this.reservationController.addReservation.bind(this.reservationController));
        // body must contain all reservation fields and query param must contain reservation_id
        app
            .route(ReservationRoutes.RESERVAION_ROUTES + ':reservation_id/update')
            .put(this.reservationController.updateReservation.bind(this.reservationController));
        // query param must contain reservation_id
        app
            .route(ReservationRoutes.RESERVAION_ROUTES + ':reservation_id/delete')
            .delete(this.reservationController.deleteReservation.bind(this.reservationController));
    }
}
exports.ReservationRoutes = ReservationRoutes;
ReservationRoutes.RESERVAION_ROUTES = config_1.AppConstants.API_PREFIX + 'reservation/';
