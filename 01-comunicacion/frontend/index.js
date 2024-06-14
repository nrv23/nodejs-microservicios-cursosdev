const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const port = 19010;

server.listen(port, () => {
    console.log("Escuchando peticiones en puerto " + port);
})