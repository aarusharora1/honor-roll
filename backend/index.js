const express = require("express");
const fs = require("fs");
const app = express();
const winston = require("winston");

const rawdata = fs.readFileSync("output.json");
const names = JSON.parse(rawdata);

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "request-log.log" })],
});
async function logRequest(request, actualName) {
  var time = new Date();
  var logString = request.ip + " requested " + actualName + " on " + time;
  logger.log({
    level: "info",
    ip: request.ip,
    actualName : actualName,
    time: time,
    string: logString
  });
  return Promise;
}
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.get("/", (req, res) => {
  res.send("Invalid Request.");
});

function cleanUp(params) {
  var firstClean = params["fName"].toString();
  var lastClean = params["lName"].toString();
  firstClean =
    firstClean.charAt(0).toUpperCase() + firstClean.slice(1).toLowerCase();
  lastClean =
    lastClean.charAt(0).toUpperCase() + lastClean.slice(1).toLowerCase();
  return firstClean + lastClean + params["year"];
}
app.get("/search/firstName/:fName/lastName/:lName/year/:year", (req, res) => {
  var params = req.params;

  var actualName = cleanUp(params);
  logRequest(req, actualName);
  if (!names[actualName]) {
    res.send("Unable to find this person");
  }
  res.json(names[actualName]);
});
app.listen(3000, () => {
  console.log("server started");
});
