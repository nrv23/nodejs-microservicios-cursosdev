const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const port = process.env.PORT || 19010;

server.listen(port, () => {
    console.log("Escuchando peticiones en puerto:: " + port);
})