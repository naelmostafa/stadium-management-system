import { StadiumModel } from "../../models";
import { Stadium } from "../../models";

const model = new StadiumModel();

describe('Stadium Model Test', () => {

    it('should get all stadiums', async () => {
        const result = await model.getAllStadiums();
        expect(result).toBeDefined();
    });
    
    it ('should get available stadiums', async () => {
        const result = await model.getAvailableStadiumsByDate('2023-07-01','18:00','20:00');
        expect(result).toBeDefined();
    }
    );
});