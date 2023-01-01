import express from 'express';
import { StadiumController } from '../../controllers';

class StadiumRoutes {
  private stadium: StadiumController;

  constructor() {
    this.stadium = new StadiumController();
  }

  public routes(app: express.Application): void {
    app
      .route('/api/v1/stadium/all')
      .get(this.stadium.getAllStadiums.bind(this.stadium));
    // reservation_date,start_time and end_time mubt be provided in query parameters
    app
      .route('/api/v1/stadium/available-stadiums')
      .get(this.stadium.getAvailableStadiums.bind(this.stadium));
    app
      .route('/api/v1/stadium/add')
      .post(this.stadium.addAvailableStadiums.bind(this.stadium));
    // body must contain and all stadium fields
    app
      .route('/api/v1/stadium/:stadium_id/update')
      .put(this.stadium.updateStadium.bind(this.stadium));
    app
      .route('/api/v1/stadium/:stadium_id/delete')
      .delete(this.stadium.deleteStadium.bind(this.stadium));
  }
}

export { StadiumRoutes };
