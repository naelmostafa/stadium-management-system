"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const config_1 = require("../../../config");
const user_1 = require("./user");
class AdminModel extends user_1.UserModel {
    // ...
    async adminLogin(email, password) {
        try {
            const user = await super.login(email, password);
            if (user == null)
                return null;
            const sql = `SELECT * FROM admins WHERE id = $1`;
            const result = await config_1.client.query(sql, [user.id]);
            if (result.rows.length == 1) {
                const admin = {
                    ...user,
                };
                return admin;
            }
            return null;
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
    async addNewAdmin(name, email, password, phoneNumber) {
        try {
            const user = await super.register(name, email, password, phoneNumber);
            const sql = `INSERT INTO admins (id) VALUES ($1) RETURNING *`;
            const result = await config_1.client.query(sql, [user.id]);
            if (result.rows.length == 1) {
                const admin = {
                    ...user,
                };
                return admin;
            }
            else {
                throw new Error('Admin Register failed');
            }
        }
        catch (err) {
            const errorMessage = err?.message ?? 'Something went wrong';
            throw new Error(errorMessage);
        }
    }
}
exports.AdminModel = AdminModel;
