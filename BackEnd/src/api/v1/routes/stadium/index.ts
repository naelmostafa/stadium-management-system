import express from 'express';
import { StadiumController } from '../../controllers/stadium/stadium_controller';
const routes = express.Router();
const stadiumController = new StadiumController();

// any one can access this route
// must be associated with query params reservation_date and reservation_time
routes.get('/availbe-stadiums', stadiumController.getAvailableStadiums);

// TODO : Authentication (only accessed by admins or employees)
routes.post('/add', stadiumController.addAvailableStadiums);

export default routes;
