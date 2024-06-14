const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());


app.use("/", express.static("./public"));

app.get("/", (req, res) => res.send("Todo Ok"));
app.get("/healtcheck", (req, res) => res.send("Healthy"));
app.get("/api/config", (req, res) => {
    return res.json({
        pathBackend1: "http://localhost:19020/api/message"
    })
})

app.use("**", (_, res) => res.status(404).send("Ruta no encontrada"));


module.exports = app;