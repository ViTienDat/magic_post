const express = require("express");
const cors = require("cors");
require("dotenv").config();
const initRoute = require("./src/router");
const app = express();
require("./connect_database");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoute(app);

app.listen(port, () => console.log(`server running in ${port}`));
