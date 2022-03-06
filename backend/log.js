const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "request-log.log" })],
});
async function logRequest(request, actualName) {
  var time = new Date();
  var logString = request.ip + " requested " + actualName + " on " + time;
  logger.log({
    level: "info",
    ip: request.ip,
    actualName: actualName,
    time: time,
    string: logString,
  });
}

module.exports = {
  logger: logger,
  logRequest: logRequest,
};
