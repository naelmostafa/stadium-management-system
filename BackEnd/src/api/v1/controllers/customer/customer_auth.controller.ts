import { Request, Response } from 'express';
import { ResponseMessages, StatusCodes } from '../../../../config';
import { Customer, CustomerModel } from '../../models';
import { HelperFunction } from '../../utils';

class CustomerAuthController {
  public async login(req: Request, res: Response) {
    const customerModel = new CustomerModel();
    try {
      const { email, password } = req.body;
      // validate email and password
      if (!(email && password)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.LOGIN_BODY_ERROR,
        });
        return;
      }
      const customer: Customer|null = await customerModel.login(email, password);

      if (customer!==null) {
        res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: ResponseMessages.LOGIN_SUCCESS,
          data: customer,
        });
        return;

      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          status: StatusCodes.UNAUTHORIZED,
          message: ResponseMessages.LOGIN_UNAUTHORIZED,
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

  public async register(req: Request, res: Response) {
    try {
      // check if body is valid and has email and password

      const email: string = req.body.email;
      const password: string = req.body.password;
      const name: string = req.body.name;
      const phone: string = req.body.phone;

      if (!this.validateRegisterBody(email, password, name, phone)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.REGISTER_BODY_ERROR,
        });
        return;
      }
      const customerModel = new CustomerModel();

      const customer: Customer = await customerModel.register(
        name,
        email,
        password,
        phone
      );
      if (customer) {
        res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: ResponseMessages.REGISTER_SUCCESS,
          data: customer,
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.REGISTER_FAILED,
        });
      }
    } catch (err) {
      console.log(err);
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }

  // test dummy model
  async testGet(req: Request, res: Response) {
    const customerModel = new CustomerModel();
    try {
      const customer: string = await customerModel.testGet();
      if (customer) {
        res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: ResponseMessages.REGISTER_SUCCESS,
          data: customer,
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.REGISTER_FAILED,
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

  async testPost(req: Request, res: Response) {
    const customerModel = new CustomerModel();
    try {
      const customer: string = await customerModel.testPost(
        req.body.username,
        req.body.password
      );
      if (customer) {
        res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: ResponseMessages.REGISTER_SUCCESS,
          data: customer,
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.REGISTER_FAILED,
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

  private validateRegisterBody(
    email: string,
    password: string,
    name: string,
    phone: string
  ): boolean {
    if (!(email && password && name && phone)) {
      return false;
    }

    if (!HelperFunction.validateEmail(email)) {
      return false;
    }
    // validayte password length
    if (password.length < 6) {
      return false;
    }
    // validate name length
    if (name.trim().length == 0) {
      return false;
    }
    return true;
  }

}

export { CustomerAuthController };
