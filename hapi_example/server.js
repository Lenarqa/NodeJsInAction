const Hapi = require("hapi");
const Inert = require("inert");

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

const init = async () => {
  await server.register(Inert);

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
        index: true,
      },
    },
  });

  server.route({
    method: "GET",
    path: "/hello",
    handler: (request, reply) => {
      return "Hello!";
    },
  });

  await server.start((err) => {
    if (err) throw err;
  });
  console.log("Start: ", server.info.uri);
};

init();
