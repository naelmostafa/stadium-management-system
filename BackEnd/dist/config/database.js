"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const app_constants_1 = require("./constants/app_constants");
const pg_2 = __importDefault(require("pg"));
const client = new pg_1.Pool({
    host: app_constants_1.database.HOST,
    database: app_constants_1.database.DATABASE,
    user: app_constants_1.database.USER,
    password: app_constants_1.database.PASSWORD,
});
exports.client = client;
pg_2.default.types.setTypeParser(1082, (value) => value);
