const EventEmitter = require("events").EventEmitter;
const net = require("net");

const channel = new EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.setMaxListeners(50);

channel.on("join", function (id, client) {
  const welcom = `Welcome! Guests online: ${
    this.listeners("broadcast").length
  }\n`;
  client.write(welcom);

  this.clients[id] = client;
  this.subscriptions[id] = (senderId, message) => {
    if (id != senderId) this.clients[id].write(message);
  };
  this.on("broadcast", this.subscriptions[id]);
});

channel.on("leave", function (id) {
  channel.removeListener("broadcast", this.subscriptions[id]);
  channel.emit("broadcast", id, `\n${id} has left the chatroom.\n`);
});

const server = net.createServer((client) => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  channel.emit("join", id, client);

  client.on("data", (data) => {
    data = data.toString();
    channel.emit("broadcast", id, data);
  });

  client.on("close", () => {
    channel.emit("leave", id);
  });
});

server.listen(8888);
