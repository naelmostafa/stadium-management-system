"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../../server");
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.app);
describe("Stadium End Points Test", () => {
    it("should return status 200 on get all stadiums", async () => {
        const response = await request.get("/api/v1/stadium/all");
        expect(response.status).toBe(200);
    });
    it("should return status 404 on get stadium wrong id", async () => {
        const response = await request.get("/api/v1/stadium/1");
        expect(response.status).toBe(404);
    });
    it('should return 200 on get available stadiums', async () => {
        const response = await request.get("/api/v1/stadium/available-stadiums?reservation_date=2023-07-01&start_time=18:00&end_time=20:00");
        expect(response.status).toBe(200);
    });
});
