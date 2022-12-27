 
const { createLogger , format,  transports } = require('winston') 
const winston = require('winston')

module.exports = createLogger({
     level: 'info',
     format: format.combine(
       format.timestamp({
         format: 'YYYY-MM-DD HH:mm:ss'
       }),
       format.errors({ stack : true }),
       format.splat(),
       format.json()
     ),
     defaultMeta: { service: 'user-service' },
     transports: [
       //
       // - Write all logs with importance level of `error` or less to `error.log`
       // - Write all logs with importance level of `info` or less to `combined.log`
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' }),
     ],
   });

   