"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
exports.logger = winston_1.default.createLogger({
    level: 'info',
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
        }),
        // new winston.transports.File({
        //   filename: 'logs/error.log',
        //   level: 'error',
        //   format: winston.format.combine(
        //     winston.format.timestamp(),
        //     winston.format.prettyPrint()
        //   ),
        // }),
        // new winston.transports.File({
        //   format: winston.format.combine(
        //     winston.format.timestamp(),
        //     winston.format.prettyPrint()
        //   ),
        //   filename: 'logs/combined.log',
        // }),
    ],
});
