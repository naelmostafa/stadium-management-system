import { Request, Response } from 'express';
import { ResponseMessages, StatusCodes } from '../../../../config/constants';
import { Stadium, StadiumModel } from '../../models';

export class StadiumController {
  public async getAvailableStadiums(req: Request, res: Response) {
    try {
      let reservationDate = req.query.reservation_date;
      let reservationTime = req.query.reservation_time;
      // validate reservationDate and reservationTime
      if (!(reservationDate && reservationTime)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.QUERY_PARAMS_ERROR,
        });
        return;
      }
      reservationDate = reservationDate.toString();
      reservationTime = reservationTime.toString();
      const stadiumModel: StadiumModel = new StadiumModel();
      const stadiums: Stadium[] = await stadiumModel.getAvailableStadiumsByDate(
        reservationDate,
        reservationTime
      );
      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessages.GET_STADIUMS_SUCCESS,
        data: stadiums,
      });
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }

  // add new stadium

  public async addAvailableStadiums(req: Request, res: Response) {
    /// TODO AUTHENTICATION
    try {
      let stadium: Stadium = req.body;

      // validate stadium fileds
      if (!this.validateStadium(stadium)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.NO_BODY_ERROR,
        });
        return;
      }
      const stadiumModel: StadiumModel = new StadiumModel();
      stadium = await stadiumModel.addStadium(stadium);
      if (stadium) {
        res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: ResponseMessages.GET_STADIUMS_SUCCESS,
          data: stadium,
        });
        return;
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.OK,
          message: ResponseMessages.ERROR,
        });
        return;
      }
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }

  private validateStadium(stadium: Stadium): boolean {
    if (!stadium.cost_per_hour) return false;
    if (!stadium.description) return false;
    if (!stadium.location) return false;
    if (!stadium.name) return false;
    if (!stadium.size) return false;
    if (!stadium.stadium_number && stadium.stadium_number < 0) return false;
    if (!stadium.status) return false;

    return true;
  }
}
