import {Request, Response} from 'express';
import { StatusCodes,ResponseMessages } from '../../../../config';
import { Employee, EmployeeModel } from '../../models';

export class EmployeeController {
    private employeeModel:EmployeeModel;
    constructor(){
        this.employeeModel = new EmployeeModel();
    }

    public async login(req: Request, res: Response) {
        try {
          const { email, password } = req.body;
          // validate email and password
          if (!(email && password)) {
            res.status(StatusCodes.BAD_REQUEST).json({
              status: StatusCodes.BAD_REQUEST,
              message: ResponseMessages.LOGIN_BODY_ERROR,
            });
          }
          const employee: Employee = await this.employeeModel.login(email, password);
          if (employee) {
            res.status(StatusCodes.OK).json({
              status: StatusCodes.OK,
              message: ResponseMessages.LOGIN_SUCCESS,
              data: employee,
            });
          } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
              status: StatusCodes.UNAUTHORIZED,
              message: ResponseMessages.LOGIN_UNAUTHORIZED,
            });
          }
        } catch (err) {
          const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: errorMessage,
          });
        }
      }
}