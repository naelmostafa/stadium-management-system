"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
describe('Helper fuctions Test', () => {
    it('should validate email', () => {
        const email = "test.com";
        const result = utils_1.HelperFunction.validateEmail(email);
        expect(result).toBe(false);
    });
});
