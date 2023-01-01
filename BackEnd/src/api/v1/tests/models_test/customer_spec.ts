import { CustomerModel } from "../../models";
import { Customer } from "../../models";

const model = new CustomerModel();

describe('Customer Model Test', () => {

    it('should get all customers', async () => {
        const result = await model.getAllCustomers();
        expect(result).toBeDefined();
    }
    );
    it('should login custmer', async () => {
        const res = await model.login("test", "123456");
        expect(res).toBeNull();
    }
    );
   
});