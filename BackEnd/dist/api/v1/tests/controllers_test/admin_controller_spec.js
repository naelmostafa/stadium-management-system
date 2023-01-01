"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = require("../../controllers/admin/admin.controller");
const controller = new admin_controller_1.AdminController();
describe('Admin Controller Functions Test', () => {
    it('should validate user params', () => {
        const result = controller.validateUser("name", "test@test.com", "12345678", "012345678989");
        expect(result).toBe(true);
    });
    it('should validate emplyee params', () => {
        const result = controller.validateEmployee("name", "email", "password", "", "", 1000);
        expect(result).toBe(false);
    });
});
