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
      const stadiums: Stadium[] = await this.stadiumModel.getAvailableStadiumsByDate(
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
      let stadium: Stadium = req.body;
      // check if stadium id is provided

      // validate stadium fileds
      if (!this.validateStadium(stadium) || !stadium.id || stadium.id < 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.BODY_ERROR,
        });
        return;
      }
      stadium = await this.stadiumModel.updateStadium(stadium.id,stadium);
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
      const stadiumId:number = (req.query.stadium_id as unknown) as number;
      // check if stadium id is provided
      if (!stadiumId || stadiumId < 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.QUERY_PARAMS_ERROR,
        });
        return;
      }
      const isDeleted:boolean = await this.stadiumModel.deleteStadium(stadiumId);
      if (isDeleted) {
        res.status(StatusCodes.NO_CONTENT).send();
        return;
      }
      else {
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
