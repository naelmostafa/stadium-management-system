import { client } from '../../../config'; // this class communicate with the database
import bcrypt from 'bcrypt'; // this class encrypt the password

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
};

// this class communicate with the database
class UserModel {
  // login
  async login(email: string, password: string): Promise<User> {
    try {
      // verify bcrypt password
      const sql = `SELECT * FROM users WHERE email = ? `;
      const result = await client.query(sql, [email]);
      if (result.rows.length == 1) {
        const user: User = result.rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
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
    phoneNumber: string,
    profilePicture: string
  ): Promise<User> {
    try {
      const saltRounds: number = process.env.SALT_ROUNDS as unknown as number;
      password = await bcrypt.hash(password, saltRounds);
      const sql = `INSERT INTO users (name, email, password, phone_number, profile_picture) VALUES (?, ?, ?, ?, ?) RETURNING *`;
      const result = await client.query(sql, [
        name,
        email,
        password,
        phoneNumber,
        profilePicture,
      ]);
      if (result.rows.length == 1) {
        const user: User = result.rows[0];
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