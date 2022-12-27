import { client } from '../../../config';
import { User, UserModel } from './user';

interface Admin extends User {
  // ...
}

class AdminModel extends UserModel {
  // ...
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
