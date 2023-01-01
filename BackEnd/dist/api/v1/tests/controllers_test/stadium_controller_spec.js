"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../controllers");
describe('Stadium Controller Test', () => {
    it('should validate stadium params', () => {
        const controller = new controllers_1.StadiumController();
        const stadium = {
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
