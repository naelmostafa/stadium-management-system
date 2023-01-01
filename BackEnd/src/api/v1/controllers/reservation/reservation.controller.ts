import { Request, Response } from 'express';
import { ResponseMessages, StatusCodes } from '../../../../config';
import { Reservation, ReservationModel } from '../../models';

export class ReservationController {
  private reservationModel: ReservationModel;
  constructor() {
    this.reservationModel = new ReservationModel();
  }
  public async addReservation(req: Request, res: Response) {
    try {
      const reservation: Reservation = req.body;
      // validate reservation
      if (!this.validateReservation(reservation)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.BODY_ERROR,
        });
        return;
      }
      if (!this.validateReservationTime(reservation)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.RESERVATION_DATETIME_ERROR,
        });
        return;
      }
      // check if stadium is available

      const isStadiumAvailable =
        await this.reservationModel.isReservationAvailable(
          reservation.date,
          reservation.start_time,
          reservation.end_time,
          reservation.stadium_id
        );
      if (!isStadiumAvailable) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.RESERVATION_CONFLICT,
        });
        return;
      }
      const newReservation: Reservation =
        await this.reservationModel.addReservation(reservation);
      res.status(StatusCodes.CREATED).json({
        status: StatusCodes.CREATED,
        message: ResponseMessages.ADD_RESERVATION_SUCCESS,
        data: newReservation,
      });
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }

  public async getAllReservations(req: Request, res: Response) {
    try {
      const reservations: Reservation[] =
        await this.reservationModel.getAllReservations();
      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessages.GET_RESERVATIONS_SUCCESS,
        data: reservations,
      });
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }

  public async getReservationById(req: Request, res: Response) {
    try {
      const reservationId = req.params.reservation_id as unknown as number;
      // validate reservationId
      if (!reservationId || isNaN(reservationId) || reservationId < 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.ID_ERROR,
        });
        return;
      }

      const reservation: Reservation =
        await this.reservationModel.getReservationById(reservationId);
      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessages.GET_RESERVATIONS_SUCCESS,
        data: reservation,
      });
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }
  public async updateReservation(req: Request, res: Response) {
    try {
      const reservationId = req.params.reservation_id as unknown as number;
      const reservation: Reservation = req.body;
      // validate reservationId
      if (!reservationId || isNaN(reservationId) || reservationId < 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.ID_ERROR,
        });
        return;
      }
      // validate reservation
      if (!this.validateReservation(reservation)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.BODY_ERROR,
        });
        return;
      }
      if (!this.validateReservationTime(reservation)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.RESERVATION_DATETIME_ERROR,
        });
        return;
      }
      // check if stadium is available
      const isStadiumAvailable =
        await this.reservationModel.isReservationAvailable(
          reservation.date,
          reservation.start_time,
          reservation.end_time,
          reservation.stadium_id,
          reservationId
        );
      if (!isStadiumAvailable) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.RESERVATION_CONFLICT,
        });
        return;
      }

      const updatedReservation: Reservation =
        await this.reservationModel.updateReservation(
          reservationId,
          reservation
        );
      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessages.UPDATE_RESERVATION_SUCCESS,
        data: updatedReservation,
      });
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }

  public async deleteReservation(req: Request, res: Response) {
    try {
      const reservationId = req.params.reservation_id as unknown as number;
      // validate reservationId
      if (!reservationId || isNaN(reservationId) || reservationId < 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.ID_ERROR,
        });
        return;
      }
      const deletedReservation: Reservation =
        await this.reservationModel.deleteReservation(reservationId);
      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessages.DELETE_RESERVATION_SUCCESS,
        data: deletedReservation,
      });
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }

  public validateReservation(reservation: Reservation): boolean {
    if (!reservation) {
      return false;
    }
    if (
      !reservation.stadium_id ||
      isNaN(reservation.stadium_id) ||
      reservation.stadium_id < 0
    ) {
      return false;
    }
    if (
      !reservation.customer_id ||
      isNaN(reservation.customer_id) ||
      reservation.customer_id < 0
    ) {
      return false;
    }
    if (!reservation.date) {
      return false;
    }
    if (!reservation.start_time) {
      return false;
    }
    if (!reservation.end_time) {
      return false;
    }

    if (!reservation.deposit || reservation.deposit < 0) return false;
    if (!reservation.total_price || reservation.total_price < 0) return false;
    if (!reservation.payment_method) return false;

    return true;
  }

  public validateReservationTime(reservation: Reservation): boolean {
    // validate start_time and end_time
    const dateSplit = reservation.date.split('-');
    const year = dateSplit[0] as unknown as number;
    const month = dateSplit[1] as unknown as number;
    const day = dateSplit[2] as unknown as number;
    const startHour = reservation.start_time.split(':')[0] as unknown as number;
    const startMinute = reservation.start_time.split(
      ':'
    )[1] as unknown as number;
    const endHour = reservation.end_time.split(':')[0] as unknown as number;
    const endMinute = reservation.end_time.split(':')[1] as unknown as number;

    const startTime = new Date(year, month, day, startHour, startMinute);
    const endTime = new Date(year, month, day, endHour, endMinute);

    if (startTime.getTime() >= endTime.getTime()) {
      return false;
    }
    // validate date
    const date = new Date(reservation.date);
    if (date.getTime() < new Date().getTime()) {
      return false;
    }
    return true;
  }
}
