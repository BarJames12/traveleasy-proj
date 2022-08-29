import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import users from "./controllers/users.js";
import vacationsControllers from "./controllers/vacationscontrollers.js";
import followControllers from "./controllers/followcontroller.js";

import errorHandler from './errors/error-handler.js';

const server = express();
dotenv.config();
server.use(bodyParser.json({ limit: "30mb", extended: true }));
server.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
server.use(cors()); //react

server.use("/users", users);
server.use("/vacations", vacationsControllers);
server.use("/follow", followControllers);

server.get("/", (req, res) => {
  res.send("APP IS RUNNING. :]");
});


const PORT = process.env.PORT || 3001;

server.use(errorHandler);



server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
