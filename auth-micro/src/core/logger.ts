import * as winston from "winston"
import {format} from "winston"
import * as dotenv from "dotenv"
dotenv.config({path:'./../../.env'})

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'log/combined.log' }),
    ],
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  logger.transports.map((e)=>{ 
    e.level="debug"; e.format = winston.format.combine(
      format.timestamp({format: 'DD-MM-YYYY HH:mm:ss.SSS'}),
      format.splat(),
      format.colorize(),
      format.printf(({level, message, label, timestamp}) => `${timestamp} ${label || '-'} ${level}: ${message}`),
    )
    return e
  })

  export const myStream = {
    write:(text:string)=>{
      logger.info(text)
    }
  }

