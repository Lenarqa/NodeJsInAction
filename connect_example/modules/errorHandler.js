function errorHandler() {
  const env = process.env.NODE_ENV || "develop";

  return function (err, req, res, next) {
    res.statusCode = 500;
    switch (env) {
      case "develop":
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(err));
        break;

      default:
        res.end("Server error!");
    }
  };
}

module.exports = errorHandler;
