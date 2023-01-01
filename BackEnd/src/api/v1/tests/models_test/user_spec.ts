import { UserModel } from "../../models";
import { User } from "../../models";

const model = new UserModel();

describe('User Model Test', () => {
    it('should login user', async () => {
      const email = "test@test.com";
        const password =    "1234567";
        
       
        const result = await model.login(email, password);
        expect(result?.id).toBeDefined();
    });
});

