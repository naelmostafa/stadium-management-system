import { AdminModel } from "../../models";
import { Admin } from "../../models";

const model = new AdminModel();

describe('Admin Model Test', () => {
    it('should login admin', async () => {
        const email = "test";
        const password = "123456";
        const result = await model.login(email, password);
        expect(result).toBeNull();
    });
});