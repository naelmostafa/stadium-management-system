import {app} from '../../../../server';
import supertest from 'supertest';

const request = supertest(app);

describe("Admin End Points Test", () => {
        it("should return status 400 on login body bad request", async () => {
            const response = await request.post("/api/v1/admin/login").send({
                "email": "test.com",
                "password": "123456"
            });
            expect(response.status).toBe(400);
        });

        it("should return 200 on show all customers" , async ()=> {
            const response = await request.get("/api/v1/admin/customers");
            expect(response.status).toBe(200);
        });

        it("should return 200 on show all employees" , async() => {
            const response = await request.get("/api/v1/admin/employees");
            expect(response.status).toBe(200);
        });

        it("should return 200 on show revenue" , async() => {
            const response = await request.get("/api/v1/admin/revenue");
            expect(response.status).toBe(200);
        }
        );
});
