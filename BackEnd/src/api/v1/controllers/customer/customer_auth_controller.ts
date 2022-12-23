import e, { Request, Response } from "express";
import { ResponseMessages, StatusCodes } from "../../../../config/constants";
import { Customer, CustomerModel, User } from "../../models";
export class CustomerAuthController {
  public async login(req: Request, res: Response) {

    try {
      const { email, password } = req.body;
      // validate email and password
        if (!(email && password)) {
            res.status(StatusCodes.BAD_REQUEST)
            .json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessages.LOGIN_BODY_ERROR,
            });
        }
      const customerModel: CustomerModel = new CustomerModel();
      const customer:Customer = await customerModel.login(email, password);
        if (customer) {
            res.status(StatusCodes.OK)
            .json({
                status: StatusCodes.OK,
                message:ResponseMessages.LOGIN_SUCCESS,
                data: customer,
            });
        } else {
            res.status(StatusCodes.UNAUTHORIZED)
            .json({
                status: StatusCodes.UNAUTHORIZED,
                message: ResponseMessages.LOGIN_UNAUTHORIZED,
            });
        }
    } catch (err) {
        const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: errorMessage,
        });
    }
}

public async register(req: Request, res: Response) {
 
    try{
        const { email, password, name, phone } = req.body;
        // validate email and password
        if (!(email && password && name && phone)) {
            res.status(StatusCodes.BAD_REQUEST)
            .json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessages.LOGIN_BODY_ERROR,
            });
        }
        const customerModel: CustomerModel = new CustomerModel();
        const customer: Customer = await customerModel.register(email, password, name, phone);
        if (customer) {
            res.status(StatusCodes.OK)
            .json({
                status: StatusCodes.OK,
                message: ResponseMessages.REGISTER_SUCCESS,
                data: customer,
            });
        }
        else{
            res.status(StatusCodes.BAD_REQUEST)
            .json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessages.REGISTER_FAILED,
            });
        }
    } catch (err) {
        const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: errorMessage,
        });
    }
}
}

