const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.get("/", (req, res) => res.send("Todo Ok"));
app.get("/healtcheck", (req, res) => res.send("Healthy"));
app.get("/api/message", (req, res) => {
    return res.json({
        message: "Message from Backend 2"
    })
})

app.use("**", (_, res) => res.status(404).send("route no encontrada"));


module.exports = app;