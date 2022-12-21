import { User, UserModel } from './user';
import client from '../../../config/database'; // this class communicate with the database

export interface Employee extends User {
  salary: number;
  ssn: string;
}

class EmployeeModel extends UserModel {
  // ...

  async getSalary(id: number): Promise<number> {
    try {
      const sql = `SELECT salary FROM employee WHERE id = ?`;
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
      const sql = `SELECT ssn FROM employee WHERE id = ?`;
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
