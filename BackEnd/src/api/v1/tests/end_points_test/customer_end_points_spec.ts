
import {app} from '../../../../server';
import supertest from 'supertest';

const request = supertest(app);


describe("Customer End Points Test", () => {
    describe("Customer Auth End Points Test", () => {
        it("should return status 400 on register body bad request", async () => {
            const response = await request.post("/api/v1/customer/register").send({
                "email": "test.com",
                "name": "test reg",
                "password": "1234567"
            });
            expect(response.status).toBe(400);
        });
        it("should login a customer (return 200 OK)", async () => {
            const response = await request.post("/api/v1/customer/login").send({
                email: "test@test.com",
                password: "1234567"
            });
            expect(response.status).toBe(200);
        });
        it("should return status 401 on login unauthorized", async () => {
            const email = "test@test.com";
            const password = "1234";
            const response = await request.post("/api/v1/customer/login").send({
                "email": email,
                "password": password
            });
            expect(response.status).toBe(401);
        });
    });

});
