import { User, UserModel } from './user';
import client from '../../../config/database'; // this class communicate with the database

export interface Customer extends User {
  balance: number;
}

class CustomerModel extends UserModel {
  // ...

  async getBalance(id: number): Promise<number> {
    try {
      const sql = `SELECT balance FROM customers WHERE id = ?`;
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
}
