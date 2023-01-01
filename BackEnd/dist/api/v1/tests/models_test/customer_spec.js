"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const model = new models_1.CustomerModel();
describe('Customer Model Test', () => {
    it('should get all customers', async () => {
        const result = await model.getAllCustomers();
        expect(result).toBeDefined();
    });
    it('should login custmer', async () => {
        const res = await model.login("test", "123456");
        expect(res).toBeNull();
    });
});
