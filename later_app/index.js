const express = require("express");
const bodyParser = require("body-parser");
const Article = require("db").Article;

const app = express();
const articles = [{ title: "example" }];

/** INIT */
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Get all articles */
app.get("/articles", (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);
    res.send(articles);
  });
});

/** Create article */
app.post("/articles", (req, res, next) => {
  const article = { title: req.body.title };
  articles.push(article);
  res.send(article);
});

/** Get single article */
app.get("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err);
    res.send(article);
  });
});

/** Delete article */
app.delete("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("Deleting: ", id);
  delete articles[id];
  res.send({ message: "Deleted" });
});

app.listen(app.get("port"), () => {
  console.log(
    `Express web app available at http://localhost:${app.get("port")}`
  );
});

module.exports = app;
