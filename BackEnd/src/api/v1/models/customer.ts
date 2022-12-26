import { User, UserModel } from './user';
import { client, ResponseMessages} from '../../../config'; // this class communicate with the database

interface Customer extends User {
  balance: number;
}

class CustomerModel extends UserModel {
  // ...
  // login
  async login(email: string, password: string): Promise<Customer> {
    try {
      const user: User = await super.login(email, password);
      const sql = `SELECT * FROM customer WHERE id = $1`;
      const result = await client.query(sql, [user.id]);
      if (result.rows.length == 1) {
        const customer: Customer = {
          ...user,
          balance: result.rows[0].balance,
        };
        return customer;
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? ResponseMessages.ERROR;
      throw new Error(errorMessage);
    }
  }
  // register
  async register(
    name: string,
    email: string,
    password: string,
    phoneNumber: string
  ): Promise<Customer> {
    try {
      const user: User = await super.register(
        name,
        email,
        password,
        phoneNumber
      );
      const sql = `INSERT INTO customer (id, balance) VALUES ($1, $2) RETURNING *`;
      const result = await client.query(sql, [user.id, 0]);
      if (result.rows.length == 1) {
        const customer: Customer = {
          ...user,
          balance: result.rows[0].balance,
        }
        return customer;
      } else {
        throw new Error('Register failed');
      }
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async getBalance(id: number): Promise<number> {
    try {
      const sql = `SELECT balance FROM customer WHERE id = $1`;
      const result = await client.query(sql, [id]);
      if (result.rows.length == 1) {
        const balance = result.rows[0].balance;
        return balance;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  // dummy to check the flow
  async testGet(): Promise<string> {
    try {
      return 'Hello World';
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  async testPost(username:string, password:string ): Promise<string> {
    try {
      return `Hello ${username} with password ${password}`;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

}

export { Customer, CustomerModel };
