const cors = require("cors");
const express = require("express");
const pathBackend1 = process.env.SERVICE_BACKEND1 || "http://localhost:9020/api/message";

const app = express();
app.use(cors());
app.use("/", express.static("./public"));
app.get("/", (req, res) => res.send("Todo Ok"));
app.get("/healtcheck", (req, res) => res.send("Healthy"));
app.get("/api/config", (req, res) => {
    return res.json({
        pathBackend1
    })
})

app.use("**", (_, res) => res.status(404).send("route no encontrada"));


module.exports = app;