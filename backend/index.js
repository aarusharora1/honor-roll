const express = require("express");
const path = require('path');

const fs = require("fs");
const app = express();
const { logRequest } = require("./log.js");
const rawdata = fs.readFileSync("output.json");
const names = JSON.parse(rawdata);

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.get("/", (req, res) => {
  res.send("Invalid Request.");
  //res.sendFile(path.join(__dirname, '../frontend/index.html'));
  //res.sendFile(path.join(__dirname, '../frontend/submit.js'));
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
    res.status(404).send("Unable to find this person");
  }
  else{
  res.json(names[actualName]);
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server started");
});
module.exports = app;