const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(port, () => {
  console.log(`Express web app on http://localhost:${port}`);
});
