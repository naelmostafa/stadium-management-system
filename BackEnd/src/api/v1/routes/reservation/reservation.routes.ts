import express from 'express';
import { AppConstants } from '../../../../config';
import { ReservationController } from '../../controllers/reservation/reservation.controller';

class ReservationRoutes {
  private reservationController: ReservationController;
  private static RESERVAION_ROUTES: string =
    AppConstants.API_PREFIX + 'reservation/';

  constructor() {
    this.reservationController = new ReservationController();
  }

  public routes(app: express.Application): void {
    app
      .route(ReservationRoutes.RESERVAION_ROUTES + 'all')
      .get(
        this.reservationController.getAllReservations.bind(
          this.reservationController
        )
      );
    app
      .route(ReservationRoutes.RESERVAION_ROUTES + ':reservation_id')
      .get(
        this.reservationController.getReservationById.bind(
          this.reservationController
        )
      );
    app
      .route(ReservationRoutes.RESERVAION_ROUTES + 'add')
      .post(
        this.reservationController.addReservation.bind(
          this.reservationController
        )
      );
    // body must contain all reservation fields and query param must contain reservation_id
    app
      .route(ReservationRoutes.RESERVAION_ROUTES + ':reservation_id/update')
      .put(
        this.reservationController.updateReservation.bind(
          this.reservationController
        )
      );
    // query param must contain reservation_id
    app
      .route(ReservationRoutes.RESERVAION_ROUTES + ':reservation_id/delete')
      .delete(
        this.reservationController.deleteReservation.bind(
          this.reservationController
        )
      );
  }
}

export { ReservationRoutes };
