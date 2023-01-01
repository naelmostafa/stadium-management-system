"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../controllers");
describe('Customer Auth Controller Test', () => {
    it('should validate register route body', () => {
        const controller = new controllers_1.CustomerAuthController();
        const result = controller.validateRegisterBody("name", "test@test.com", "1233", "phone");
        expect(result).toBe(false);
    });
});
