import { Request, Response } from "express";
import { Admin, AdminModel, Customer, CustomerModel, Employee, EmployeeModel, ReservationModel } from "../../models";
import { StatusCodes, ResponseMessages } from "../../../../config";
import { HelperFunction } from "../../utils";


export class AdminController {
  private adminModel: AdminModel;
  private customerModel: CustomerModel;
  private employeeModel: EmployeeModel;
  private reservationModel: ReservationModel;

  constructor() {
    this.adminModel = new AdminModel();
    this.customerModel = new CustomerModel();
    this.employeeModel = new EmployeeModel();
    this.reservationModel = new ReservationModel();
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
      const admin: Admin = await this.adminModel.login(email, password);
      if (admin) {
        res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: ResponseMessages.LOGIN_SUCCESS,
          data: admin,
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

  // add new admin
  public async addAdmin(req: Request, res: Response) {
    try {
      const name: string = req.body.name;
      const email: string = req.body.email;
      const password: string = req.body.password;
      const phone: string = req.body.phone_number;
      // validate Admin data
      if (!this.validateUser(name, email, password, phone)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.REGISTER_BODY_ERROR,
        });
        return;
      }
      const newAdmin: Admin = await this.adminModel.addNewAdmin(
        name, email, password, phone
      );
      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessages.REGISTER_SUCCESS,
        data: newAdmin
      });
      return;
    }
    catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }

  // add new employee
  public async addEmployee(req: Request, res: Response) {
    try {
      const name: string = req.body.name;
      const email: string = req.body.email;
      const password: string = req.body.password;
      const phone: string = req.body.phone_number;
      const ssn: string = req.body.ssn;
      const salary: number = req.body.salary;

      // validate Admin data
      if (!this.validateEmployee(name, email, password, phone, ssn, salary)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessages.REGISTER_BODY_ERROR,
        });
        return;
      }

      const newEmployee: Admin = await this.employeeModel.registerEmployee(
        name, email, password, phone, ssn, salary
      );
      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessages.REGISTER_SUCCESS,
        data: newEmployee
      });
      return;
    }
    catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }

  public async getAllEmployees(req: Request, res: Response) {
    try {
      const employees: Employee[] = await this.employeeModel.getAllEmployees();
      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessages.REGISTER_SUCCESS,
        data: employees
      });
      return;
    }
    catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }

  public async getAllCustomers(req: Request, res: Response) {
    try {
      const customers: Customer[] = await this.customerModel.getAllCustomers();
      res.status(StatusCodes.OK).json({

        status: StatusCodes.OK,
        message: ResponseMessages.CUSTOMERS_FETCHED,
        data: customers
      });
      return;
    }
    catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }

  async getRevnueForPastDates(req: Request, res: Response) {
    try {
      const revenue = await this.reservationModel.getRevenueForPastDays();
      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessages.GET_REVENUE_SUCCESS,
        data: revenue,
      });
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessage,
      });
    }
  }


  private validateUser(name: string, email: string, password: string, phone: string): boolean {
    if (!email || !name || !password || !phone) {
      return false;
    }
    if (name.length === 0 || phone.length) {
      return false
    }
    if (password.length < 6)
      return false
    if (!HelperFunction.validateEmail(email))
      return false;
    return true;
  }

  private validateEmployee(name: string, email: string, password: string, phone: string, ssn: string, salary: number): boolean {
    if (!this.validateUser(name, email, password, phone))
      return false;
    if (!ssn || ssn.length !== 10)
      return false;
    if (!salary || isNaN(salary))
      return false;
    return true;

  }
}