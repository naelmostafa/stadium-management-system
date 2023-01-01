import { Request, Response } from 'express';
import { ResponseMessages, StatusCodes } from '../../../../config';
import { Stadium, StadiumModel } from '../../models';

export class StadiumController {
  private stadiumModel: StadiumModel;
  constructor() {
    this.stadiumModel = new StadiumModel();
  }

  public async getAllStadiums(req: Request, res: Response) {
    try {
      const stadiums: Stadium[] = await this.stadiumModel.getAllStadiums();
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

  public async getAvailableStadiums(req: Request, res: Response) {
    try {
      let reservationDate = req.query.reservation_date;
      let reservationStartTime = req.query.start_time;
      let reservationEndTime = req.query.end_time;
      // validate reservationDate and reservationTime
      if (!(reservationDate && reservationStartTime && reservationEndTime)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.QUERY_PARAMS_ERROR,
        });
        return;
      }

      reservationDate = reservationDate.toString();
      reservationStartTime = reservationStartTime.toString();
      reservationEndTime = reservationEndTime.toString();
      if (
        !this.validateTime(
          reservationDate,
          reservationStartTime,
          reservationEndTime
        )
      ) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.RESERVATION_DATETIME_ERROR,
        });
        return;
      }
      // validate time
      const stadiums: Stadium[] =
        await this.stadiumModel.getAvailableStadiumsByDate(
          reservationDate,
          reservationStartTime,
          reservationEndTime
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
      stadium = await this.stadiumModel.addStadium(stadium);
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

  // update stadium
  public async updateStadium(req: Request, res: Response) {
    /// TODO AUTHENTICATION
    try {
      const stadiumId: number = req.params.id as unknown as number;
      let stadium: Stadium = req.body;
      // check if stadium id is provided

      // validate stadium fileds
      if (!this.validateStadium(stadium) || !stadiumId || stadiumId < 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.BODY_ERROR,
        });
        return;
      }
      stadium = await this.stadiumModel.updateStadium(stadiumId, stadium);
      if (stadium) {
        res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: ResponseMessages.UPDATE_STADIUM_SUCCESS,
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

  // delete stadium
  public async deleteStadium(req: Request, res: Response) {
    /// TODO AUTHENTICATION
    try {
      const stadiumId: number = req.params.stadium_id as unknown as number;
      // check if stadium id is provided
      if (!stadiumId || stadiumId < 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.QUERY_PARAMS_ERROR,
        });
        return;
      }
      const isDeleted: boolean = await this.stadiumModel.deleteStadium(
        stadiumId
      );
      if (isDeleted) {
        res.status(StatusCodes.NO_CONTENT).send();
        return;
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.SERVICE_UNAVAILABLE,
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

  public validateStadium(stadium: Stadium): boolean {
    if (!stadium.cost_per_hour) return false;
    if (!stadium.description) return false;
    if (!stadium.location) return false;
    if (!stadium.name) return false;
    if (!stadium.size) return false;
    if (!stadium.stadium_number && stadium.stadium_number < 0) return false;
    if (!stadium.status) return false;

    return true;
  }
  private validateTime(
    date: string,
    startTime: string,
    endTime: string
  ): boolean {
    // validate start_time and end_time
    const dateSplit = date.split('-');
    const year = dateSplit[0] as unknown as number;
    const month = dateSplit[1] as unknown as number;
    const day = dateSplit[2] as unknown as number;
    const startHour = startTime.split(':')[0] as unknown as number;
    const startMinute = startTime.split(':')[1] as unknown as number;
    const endHour = endTime.split(':')[0] as unknown as number;
    const endMinute = endTime.split(':')[1] as unknown as number;

    const startTimeD = new Date(year, month - 1, day, startHour, startMinute);
    const endTimeD = new Date(year, month - 1, day, endHour, endMinute);

    if (startTimeD.getTime() >= endTimeD.getTime()) {
      return false;
    }
    // validate date
    const dateD = new Date(date + 'T' + startTime);
    if (dateD.getTime() <= new Date().getTime()) {
      return false;
    }
    return true;
  }
}
