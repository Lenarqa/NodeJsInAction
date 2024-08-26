const http = require("http");
const fs = require("fs");

function hadErrors(err, res) {
  console.error(err);
  res.end("Server Error!");
}

function formatHtml(titles, template, res) {
  const html = template.replace("%", titles.join("</li><li>"));
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

function getTemplate(titles, res) {
  fs.readFile("./template.html", (err, data) => {
    if (err) return hadErrors(err, res);
    const template = data.toString();
    formatHtml(titles, template, res);
  });
}

function getTitles(res) {
  fs.readFile("./titles.json", (err, data) => {
    if (err) return hadErrors(err, res);
    const titles = JSON.parse(data.toString());
    getTemplate(titles, res);
  });
}

http
  .createServer((req, res) => {
    if (req.url == "/") {
      getTitles(res);
    }
  })
  .listen(8080);

// http
//   .createServer(function (request, response) {
//     response.end("Hello world!");
//   })
//   .listen(3000);
