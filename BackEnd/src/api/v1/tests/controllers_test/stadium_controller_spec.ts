import { StadiumController } from "../../controllers";
import { Stadium } from "../../models";

describe('Stadium Controller Test', () => {
    it('should validate stadium params', () => {
        const controller = new StadiumController();
        const stadium :Stadium= {
            name: "test",
            description: "test",
            cost_per_hour: 100,
            location: "test",
            size: 100,
            status: "test",
            stadium_number: 1,
            photo: "test"
        };
        const result = controller.validateStadium(stadium);
        expect(result).toBe(true);
    });
});
