const express = require("express");
const server = express();
const port = process.env.PORT || 3001;
import bodyParser from "body-parser";
import dotenv from "dotenv";


server.use(express.json());

dotenv.config();
server.use(bodyParser.json({ limit: "30mb", extended: true }));
server.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// const usersController = require("./controllers/usersControllers");
import users from "./controllers/users";
const vacationsControllers = require("./controllers/vacationsControllers");
const followControllers = require("./controllers/followController");

const cors = require("cors");
const errorHandler = require("./errors/error-handler");
const loginFilter = require("./middleware/login-filter");

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
