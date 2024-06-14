const cors = require("cors");
const express = require("express");
const axios = require("axios");
const app = express();

app.use(cors());
app.get("/", (req, res) => res.send("Todo Ok"));
app.get("/healtcheck", (req, res) => res.send("Healthy"));
app.get("/api/message", async (req, res) => {

    const pathBackend2 = "http://localhost:19030/api/message";

    const {
        data: {
            message
        }
    } = await axios.get(pathBackend2);

    const messageBackend1 = "Message from Backend 1";
    const messageBackend2 = message;

    return res.json({
        messageBackend1,
        messageBackend2
    })
})

app.use("**", (_, res) => res.status(404).send("Ruta no encontrada"));


module.exports = app;