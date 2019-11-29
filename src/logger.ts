import winston, { LoggerOptions } from "winston";

type Options = {
  file: LoggerOptions;
  console: LoggerOptions;
};
// const options: Options = {
//   file: {
//     level: "info",
//   }
// };
const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

export default logger;
