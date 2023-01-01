"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const model = new models_1.StadiumModel();
describe('Stadium Model Test', () => {
    it('should get all stadiums', async () => {
        const result = await model.getAllStadiums();
        expect(result).toBeDefined();
    });
    it('should get available stadiums', async () => {
        const result = await model.getAvailableStadiumsByDate('2023-07-01', '18:00', '20:00');
        expect(result).toBeDefined();
    });
});
