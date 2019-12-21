import winston from "winston";

// const options: Options = {
//   file: {
//     level: "info",
//   }
// };
const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      level: "info"
    })
  ]
});

export default logger;
