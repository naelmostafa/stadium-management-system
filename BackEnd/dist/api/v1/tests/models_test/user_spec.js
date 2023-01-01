"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const model = new models_1.UserModel();
describe('User Model Test', () => {
    it('should login user', async () => {
        const email = "test@test.com";
        const password = "1234567";
        const result = await model.login(email, password);
        expect(result?.id).toBeDefined();
    });
});
