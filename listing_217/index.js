const fs = require("fs");
const request = require("request");
const htmlParser = require("htmlparser");

const configFileName = "./rss_feeds.txt";
function checkForRSSFile() {
  fs.exists(configFileName, (exists) => {
    if (!exists) return next(new Error(`Missing RSS file: ${configFilename}`));
    next(null, configFileName);
  });
}

function ReedRSSFile(configFileName) {
  fs.readFile(configFileName, (err, feedList) => {
    if (err) return next(err);
    feedList = feedList
      .toString()
      .replace(/A\s+ |\s+ $/g, "")
      .split("\n");
    const random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

function downloadRSSFee(feedUrl) {
  request({ uri: feedUrl }, (err, res, body) => {
    if (err) return next(err);
    if (res.statusCode !== 200) {
      return next(new Error("Abnormal response status code"));
    }
    next(null, body);
  });
}

function parseRSSFeed(rss) {
  const handler = new htmlParser.RssHandler();
  const parser = new htmlParser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length) return next(new Error("No RSS items found"));
  const item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

const tasks = [checkForRSSFile, ReedRSSFile, downloadRSSFee, parseRSSFeed];

function next(err, result) {
  if (err) throw err;
  const currentTask = tasks.shift();
  if (currentTask) currentTask(result);
}

next();
