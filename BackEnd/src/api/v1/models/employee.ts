import { User, UserModel } from './user';
import { client } from '../../../config'; // this class communicate with the database

interface Employee extends User {
  salary: number;
  ssn: string;
}

class EmployeeModel extends UserModel {
  async getAllEmployees() : Promise<Employee[]>{
    try{
      const sql = `SELECT * from users INNER JOIN employee ON users.id = employee.id`;
      const result = await client.query(sql);
      
        return result.rows;
      }
      
    catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }
  // ...
  async login(email: string, password: string): Promise<Employee> {
    try{
    const user:User = await super.login(email,password);
    const sql = `SELECT * from employee WHERE id =$1`;
    const result = await client.query(sql, [user.id]);
    if (result.rows.length == 1) {
      const employee: Employee = {
        ...user,
        salary : result.rows[0].salary,
        ssn : result.rows[0].ssn
      };

      return employee;
    }
    else {
      throw new Error('Something went wrong.Emplyee not found');
    }
  }
  catch (err) {
    const errorMessage = (err as Error)?.message ?? 'Something went wrong';
    throw new Error(errorMessage);
  }

  }

    // register
    async registerEmployee(
      name: string,
      email: string,
      password: string,
      phoneNumber: string,
      ssn:string,
      salary:number
    ): Promise<Employee> {
      try {
        const user: User = await super.register(
          name,
          email,
          password,
          phoneNumber
        );
        const sql = `INSERT INTO employee (id, ssn,salary) VALUES ($1, $2,$3) RETURNING *`;
        const result = await client.query(sql, [user.id, ssn,salary]);
        if (result.rows.length == 1) {
          const employee: Employee = {
            ...user,
            ssn: result.rows[0].ssn,
            salary: result.rows[0].salary,
          };
          return employee;
        } else {
          throw new Error('Register failed');
        }
      } catch (err) {
        const errorMessage = (err as Error)?.message ?? 'Something went wrong';
        throw new Error(errorMessage);
      }
    }
  

  async getSalary(id: number): Promise<number> {
    try {
      const sql = `SELECT salary FROM employee WHERE id = $1`;
      const result = await client.query(sql, [id]);
      if (result.rows.length == 1) {
        const salary: number = result.rows[0].salary;
        return salary;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async getSSN(id: number): Promise<string> {
    try {
      const sql = `SELECT ssn FROM employee WHERE id = #1`;
      const result = await client.query(sql, [id]);
      if (result.rows.length == 1) {
        const ssn: string = result.rows[0].ssn;
        return ssn;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }
}

export { Employee, EmployeeModel };
