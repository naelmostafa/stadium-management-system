import { client } from '../../../config'; // this class communicate with the database
import bcrypt from 'bcrypt'; // this class encrypt the password

interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone_number: string;
  profile_picture?: string;
}

// this class communicate with the database
class UserModel {
  // login
  async login(email: string, password: string): Promise<User> {
    try {
      // verify bcrypt password
      const sql = `SELECT * FROM users WHERE email = $1`;
      const result = await client.query(sql, [email]);
      console.log(result.rows.length);
      if (result.rows.length == 1) {
        const user: User = result.rows[0];
        const isPasswordCorrect = await bcrypt.compare(
          password,
          result.rows[0].password
        );

        if (isPasswordCorrect) {
          // remove password from user object
          delete user.password;
          return user;
        } else {
          throw new Error('Invalid email or password');
        }
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }

  // register
  async register(
    name: string,
    email: string,
    password: string,
    phoneNumber: string
  ): Promise<User> {
    try {
      const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);

      const hash: string = (await bcrypt.hash(password, saltRounds)) as string;
      const sql = `INSERT INTO users (name, email, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING *`;
      const result = await client.query(sql, [name, email, hash, phoneNumber]);
      if (result.rows.length == 1) {
        const user: User = result.rows[0];
        // remove password from user object
        delete user.password;
        return user;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      const errorMessage = (err as Error)?.message ?? 'Something went wrong';
      throw new Error(errorMessage);
    }
  }
}

export { User, UserModel };
