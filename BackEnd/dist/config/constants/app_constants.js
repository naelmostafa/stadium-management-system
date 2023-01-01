"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConstants = exports.database = void 0;
exports.database = {
    HOST: process.env.DB_HOST,
    DATABASE: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    // DIALECT: process.env.DB_DIALECT,
};
exports.AppConstants = {
    PORT: process.env.PORT || 3030,
    API_PREFIX: '/api/v1/',
};
