import express from 'express';
import { StadiumController } from '../../controllers';

class StadiumRoutes {
    private stadium: StadiumController;

    constructor() {
        this.stadium = new StadiumController();
    }

    public routes(app: express.Application): void {
        app.route('/api/v1/stadium/all').get(this.stadium.getAllStadiums.bind(this.stadium));
        app.route('/api/v1/stadium/available-stadiums').get(this.stadium.getAvailableStadiums.bind(this.stadium));
        app.route('/api/v1/stadium/add').post(this.stadium.addAvailableStadiums.bind(this.stadium));
        // body must contain stadium_id and all stadium fields
        app.route('/api/v1/stadium/update').put(this.stadium.updateStadium.bind(this.stadium));
        // query param must contain stadium_id
        app.route('/api/v1/stadium/delete').delete(this.stadium.deleteStadium.bind(this.stadium));
    }
}

export { StadiumRoutes };
