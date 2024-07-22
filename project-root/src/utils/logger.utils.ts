import winston from 'winston';

const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        myFormat
      )
    }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

export const Logger = {
  info: (message: string) => {
    logger.info(message);
  },
  warn: (message: string) => {
    logger.warn(message);
  },
  error: (message: string, error?: Error) => {
    logger.error(message, error);
  }
};