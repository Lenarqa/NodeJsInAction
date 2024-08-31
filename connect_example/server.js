require("dotenv").config();
const errorHandler = require("./modules/errorHandler");
const setup = require("./modules/logger");

const app = require("connect")();

function logger(req, res, next) {
  console.log("%s %s", req.method, req.url);
  next();
}

function badMiddleware(req, res, next) {
  next(new Error("Bad middleware makes error"));
}

function hello(req, res, next) {
  foo();
  res.setHeader("Content-type", "text/plain");
  res.end("Hello Connect!");
}

app.use(setup(":method :url")).use(badMiddleware).use(hello).use(errorHandler);

app.listen("3000");
