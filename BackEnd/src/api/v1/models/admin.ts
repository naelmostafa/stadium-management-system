import { client } from '../../../config';
import { User, UserModel } from './user';

interface Admin extends User {
  // ...
}

class AdminModel extends UserModel {
  // ...
  async adminLogin(email: string, password: string): Promise<Admin|null> {
    try {
      const user: User = await super.login(email, password);
      const sql = `SELECT * FROM admins WHERE id = $1`;
      const result = await client.query(sql, [user.id]);
      if (result.rows.length == 1) {
        const admin: Admin = {
          ...user,
        };
        return admin;
      } 
      return null;
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }
  async addNewAdmin( 
    name:string,
    email:string,
    password:string,
    phoneNumber:string):Promise<Admin>{
    try {
      const user: User = await super.register(
        name,
        email,
        password,
        phoneNumber
      );
      const sql = `INSERT INTO admins (id) VALUES ($1) RETURNING *`;
      const result = await client.query(sql, [user.id]);
      if (result.rows.length == 1) {
        const admin: Admin = {
          ...user,
        };
        return admin;
      } else {
        throw new Error('Admin Register failed');
      }
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }

  } 
}

export { Admin, AdminModel };
