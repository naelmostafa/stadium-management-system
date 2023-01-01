import { CustomerAuthController } from "../../controllers";

describe('Customer Auth Controller Test', () => {
    it('should validate register route body', () => {
        const controller = new CustomerAuthController();
        const result = controller.validateRegisterBody("name", "test@test.com", "1233", "phone");
        expect(result).toBe(false);

    });
});
