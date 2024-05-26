"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const user_1 = require("./user");
const config_1 = require("../../../config"); // this class communicate with the database
class CustomerModel extends user_1.UserModel {
    // ...
    async getAllCustomers() {
        try {
            const sql = `SELECT * FROM users INNER JOIN customer ON users.id = customer.id`;
            const result = await config_1.client.query(sql);
            const customers = result.rows.map((row) => {
                const customer = {
                    id: row.id,
                    name: row.name,
                    email: row.email,
                    phone_number: row.phone_number,
                    profile_picture: row.profile_picture,
                    balance: row.balance,
                };
                return customer;
            });
            return customers;
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    // login
    async login(email, password) {
        try {
            const user = await super.login(email, password);
            const sql = `SELECT * FROM customer WHERE id = $1`;
            if (user == null)
                return null;
            const result = await config_1.client.query(sql, [user.id]);
            if (result.rows.length == 1) {
                const customer = {
                    ...user,
                    balance: result.rows[0].balance,
                };
                return customer;
            }
            else {
                return null;
            }
        }
        catch (err) {
            const errorMessage = err?.message ?? config_1.ResponseMessages.ERROR;
            throw new Error(errorMessage);
        }
    }
    // register
    async register(name, email, password, phoneNumber) {
        try {
            const user = await super.register(name, email, password, phoneNumber);
            const sql = `INSERT INTO customer (id, balance) VALUES ($1, $2) RETURNING *`;
            const result = await config_1.client.query(sql, [user.id, 0]);
            if (result.rows.length == 1) {
                const customer = {
                    ...user,
                    balance: result.rows[0].balance,
                };
                return customer;
            }
            else {
                throw new Error('Register failed');
            }
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    async getBalance(id) {
        try {
            const sql = `SELECT balance FROM customer WHERE id = $1`;
            const result = await config_1.client.query(sql, [id]);
            if (result.rows.length == 1) {
                const balance = result.rows[0].balance;
                return balance;
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
    // dummy to check the flow
    async testGet() {
        try {
            return 'Hello World';
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    async testPost(username, password) {
        try {
            return `Hello ${username} with password ${password}`;
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
}
exports.CustomerModel = CustomerModel;
