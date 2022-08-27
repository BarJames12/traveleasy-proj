import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import * as users from "./controllers/users.js";
import * as vacationsControllers from "./controllers/vacationsControllers.js";
import * as followControllers from "./controllers/followController.js";

import * as errorHandler from './errors/error-handler.js';

const server = express();
dotenv.config();
server.use(bodyParser.json({ limit: "30mb", extended: true }));
server.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
server.use(cors()); //react


const PORT = process.env.PORT || 3001;
server.use(express.json());


server.use("/users", users);
server.use("/vacations", vacationsControllers);
server.use("/follow", followControllers);

server.use(errorHandler);

server.get("/", (req, res) => {
  res.send("APP IS RUNNING. :]");
});


server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
