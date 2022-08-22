// import express from "express";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import cors from "cors";


const express = require("express");
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cors = require("cors")

// import * as users from "./controllers/users.js";
// import * as vacationsControllers from "./controllers/vacationsControllers.js";
// import * as followControllers from "./controllers/followController.js";

// import * as errorHandler from './errors/error-handler.js';
// import * as loginFilter from "./middleware/login-filter.js";


const port = process.env.PORT || 3001;
const server = express();
server.use(express.json());

dotenv.config();
server.use(bodyParser.json({ limit: "30mb", extended: true }));
server.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const users = require("./controllers/users.js");
const vacationsControllers = require("./controllers/vacationsControllers.js");
const followControllers = require("./controllers/followController.js");





const errorHandler = require("./errors/error-handler.js");
const loginFilter = require("./middleware/login-filter.js");

// server.use(cors({ origin: "http://localhost:3000" })); //react
server.use(cors()); //react
// server.use(cors({ origin: "http://localhost:4200" })); //angular

// server.use(loginFilter());

server.use("/users", users);
server.use("/vacations", vacationsControllers);
server.use("/follow", followControllers);

server.use(errorHandler);

server.get("/", (req, res) => {
  res.send("APP IS RUNNING. :]");
});


server.listen(port, () => {
  console.log(`server running on ${port}`);
});
