import { ReservationModel } from "../../models";
import { Reservation } from "../../models";

const model = new ReservationModel();

describe('Reservation Model Test', () => {
    it('should get all reservations', async () => {
        const result = await model.getAllReservations();
        expect(result).toBeDefined();
    });
    it('should get reservation by id', async () => {
        const res = await model.getReservationById(-1)
        expect(res).toBeUndefined();
    }
    );
    it('should get reservations revenue', async () => {
        const result = await model.getRevenue();
        expect(result).toBeDefined();

    }
    );

});