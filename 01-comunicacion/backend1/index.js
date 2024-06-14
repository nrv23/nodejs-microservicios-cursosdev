const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const port = 19020;

server.listen(port, () => {
    console.log("backend1 Escuchando peticiones en puerto " + port);
})