const fs = require("fs");
const tasks = [];
const wordCounts = {};
const fileDir = "./text_files";
let completeFTasks = 0;

function checkIfComplete() {
  completeFTasks++;
  if (completeFTasks == tasks.length) {
    for (let index in wordCounts) console.log(`${index}: ${wordCounts[index]}`);
  }
}

function addWordCount(word) {
  wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
}

function countWordslnText(text) {
  const words = text.toString().toLowerCase().split(/\W+/).sort();
  words.filter((word) => word).forEach((word) => addWordCount(word));
}

fs.readdir(fileDir, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const task = ((file) => {
      return () => {
        fs.readFile(file, (err, text) => {
          if (err) throw err;
          countWordslnText(text);
          checkIfComplete();
        });
      };
    })(`${fileDir}/${file}`);
    tasks.push(task);
  });
  tasks.forEach((task) => task());
});
