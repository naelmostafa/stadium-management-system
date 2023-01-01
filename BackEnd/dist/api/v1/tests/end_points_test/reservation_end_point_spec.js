"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../../server");
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.app);
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
