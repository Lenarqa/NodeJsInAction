const Hapi = require("hapi");

// const server = new Hapi.Server({
//   host: "localhost",
//   port: 8000,
// });

// const init = async () => {
//   await server.start();
//   console.log("Server running on %s", server.info.uri);
// };

// process.on("unhandledRejection", (err) => {
//   console.log(err);
//   process.exit(1);
// });

// init();

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

server.route({
  method: "GET",
  path: "/hello",
  handler: (request, reply) => {
    return "Hello!";
  },
});

server.route({
  method: "GET",
  path: "/",
  handler: (request, reply) => {
    return "Welcom";
  },
});

const init = async () => {
  await server.start((err) => {
    if (err) throw err;
  });
  console.log("Start: ", server.info.uri);
};

init();
