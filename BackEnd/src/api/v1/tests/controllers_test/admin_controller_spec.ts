import { AdminController } from "../../controllers/admin/admin.controller";
import { User } from "../../models";
const controller = new AdminController();
describe('Admin Controller Functions Test', () => {
    it('should validate user params', () => {
       
        
        const result: boolean = controller.validateUser("name", "test@test.com", "12345678", "012345678989");
        expect(result).toBe(true);
    });
    it('should validate emplyee params', () => {
        const result:boolean = controller.validateEmployee("name", "email", "password", "", "", 1000);
        expect(result).toBe(false);
    });

});



