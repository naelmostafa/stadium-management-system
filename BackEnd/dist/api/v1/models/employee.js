"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
const user_1 = require("./user");
const config_1 = require("../../../config"); // this class communicate with the database
class EmployeeModel extends user_1.UserModel {
    async getAllEmployees() {
        try {
            const sql = `SELECT * from users INNER JOIN employee ON users.id = employee.id`;
            const result = await config_1.client.query(sql);
            return result.rows;
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    // ...
    async login(email, password) {
        try {
            const user = await super.login(email, password);
            if (user == null)
                return null;
            const sql = `SELECT * from employee WHERE id =$1`;
            const result = await config_1.client.query(sql, [user.id]);
            if (result.rows.length == 1) {
                const employee = {
                    ...user,
                    salary: result.rows[0].salary,
                    ssn: result.rows[0].ssn
                };
                return employee;
            }
            else {
                return null;
            }
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    // register
    async registerEmployee(name, email, password, phoneNumber, ssn, salary) {
        try {
            const user = await super.register(name, email, password, phoneNumber);
            const sql = `INSERT INTO employee (id, ssn,salary) VALUES ($1, $2,$3) RETURNING *`;
            const result = await config_1.client.query(sql, [user.id, ssn, salary]);
            if (result.rows.length == 1) {
                const employee = {
                    ...user,
                    ssn: result.rows[0].ssn,
                    salary: result.rows[0].salary,
                };
                return employee;
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
    async getSalary(id) {
        try {
            const sql = `SELECT salary FROM employee WHERE id = $1`;
            const result = await config_1.client.query(sql, [id]);
            if (result.rows.length == 1) {
                const salary = result.rows[0].salary;
                return salary;
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
    async getSSN(id) {
        try {
            const sql = `SELECT ssn FROM employee WHERE id = #1`;
            const result = await config_1.client.query(sql, [id]);
            if (result.rows.length == 1) {
                const ssn = result.rows[0].ssn;
                return ssn;
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
exports.EmployeeModel = EmployeeModel;
