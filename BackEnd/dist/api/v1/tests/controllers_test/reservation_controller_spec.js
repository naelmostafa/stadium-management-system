"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reservation_controller_1 = require("../../controllers/reservation/reservation.controller");
describe('Reservation Controller Test', () => {
    it('should validate reservation params', () => {
        const controller = new reservation_controller_1.ReservationController();
        const reservation = {
            "customer_id": 0,
            "stadium_id": 1,
            "date": "2021-05-05",
            "start_time": "15:00",
            "end_time": "12:00",
            "deposit": 100,
            "total_price": 100,
            "payment_method": "cash"
        };
        const result = controller.validateReservation(reservation);
        expect(result).toBe(false);
    });
    it('should validate reservation time', () => {
        const controller = new reservation_controller_1.ReservationController();
        const reservation = {
            "customer_id": 1,
            "stadium_id": 1,
            "date": "2021-05-05",
            "start_time": "12:00",
            "end_time": "12:00",
            "deposit": 100,
            "total_price": 100,
            "payment_method": "cash"
        };
        const result = controller.validateReservationTime(reservation);
        expect(result).toBe(false);
    });
});
