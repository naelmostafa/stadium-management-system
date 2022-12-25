import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
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
