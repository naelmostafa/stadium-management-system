"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const config_1 = require("../../../config"); // this class communicate with the database
const bcrypt_1 = __importDefault(require("bcrypt")); // this class encrypt the password
// this class communicate with the database
class UserModel {
    // login
    async login(email, password) {
        try {
            // verify bcrypt password
            const sql = `SELECT * FROM users WHERE email = $1`;
            const result = await config_1.client.query(sql, [email]);
            if (result.rows.length == 1) {
                const user = result.rows[0];
                const isPasswordCorrect = await bcrypt_1.default.compare(password, result.rows[0].password);
                if (isPasswordCorrect) {
                    // remove password from user object
                    delete user.password;
                    return user;
                }
                else {
                    return null;
                }
            }
            return null;
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    // register
    async register(name, email, password, phoneNumber) {
        try {
            const saltRounds = parseInt(process.env.SALT_ROUNDS);
            const hash = (await bcrypt_1.default.hash(password, saltRounds));
            const sql = `INSERT INTO users (name, email, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING *`;
            const result = await config_1.client.query(sql, [name, email, hash, phoneNumber]);
            if (result.rows.length == 1) {
                const user = result.rows[0];
                // remove password from user object
                delete user.password;
                return user;
            }
            else {
                throw new Error('Something went wrong');
            }
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
}
exports.UserModel = UserModel;
