const EventEmitter = require("events").EventEmitter;
const channel = new EventEmitter();

channel.on("join", () => {
  console.log("Welcom");
});

channel.emit("join");
