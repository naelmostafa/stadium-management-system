import {app} from '../../../../server';
import supertest from 'supertest';

const request = supertest(app);

describe("Reservation End Points Test", () => {

    it("should return status 200 on get all reservations", async () => {
        const response = await request.get("/api/v1/reservation/all");
        expect(response.status).toBe(200);
    });
    it("should return status 400 on get reservation wrong id", async () => {
        const response = await request.get("/api/v1/reservation/-1");
        expect(response.status).toBe(400);
    });

});

