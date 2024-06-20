const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const port = process.env.PORT || 19030;

server.listen(port, () => {
    console.log("backend2 Escuchando peticiones en puerto " + port);
})