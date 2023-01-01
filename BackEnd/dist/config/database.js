"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const pg_2 = __importDefault(require("pg"));
const client = new pg_1.Pool({
    host: 'localhost',
    database: "stadium_management_db",
    user: 'lan_exam_user',
    password: "123456",
    port: 5432,
});
exports.client = client;
pg_2.default.types.setTypeParser(1082, (value) => value);
