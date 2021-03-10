import winston from 'winston';

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.File({filename: 'combined.log'}),
  ],
});

// log to console only in dev
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'debug',
      handleExceptions: true,
    })
  );
}

export const stream = {
  write: (message: any) => {
    logger.info(message);
  },
};
