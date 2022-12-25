import express from 'express';
import { StadiumController } from '../../controllers';

class StadiumRoutes {
    private stadium: StadiumController;

    constructor() {
        this.stadium = new StadiumController();
    }

    public routes(app: express.Application): void {
        app.route('/api/v1/stadium').get(this.stadium.getAvailableStadiums);
        app.route('/api/v1/stadium').post(this.stadium.addAvailableStadiums);
    }
}

export { StadiumRoutes };
