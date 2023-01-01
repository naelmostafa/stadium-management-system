"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const model = new models_1.AdminModel();
describe('Admin Model Test', () => {
    it('should login admin', async () => {
        const email = "test";
        const password = "123456";
        const result = await model.login(email, password);
        expect(result).toBeNull();
    });
});
