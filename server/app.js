const express = require("express");
const server = express();
const port = process.env.PORT || 3001;
server.use(express.json());

const usersController = require("./controllers/usersControllers");
const vacationsControllers = require("./Controllers/vacationsControllers");
const followControllers = require("./Controllers/followController");

const cors = require("cors");
const errorHandler = require("./errors/error-handler");
const loginFilter = require("./middleware/login-filter");

// server.use(cors({ origin: "http://localhost:3000" })); //react
server.use(cors()); //react
// server.use(cors({ origin: "http://localhost:4200" })); //angular

// server.use(loginFilter());

server.use("/users", usersController);
server.use("/vacations", vacationsControllers);
server.use("/follow", followControllers);

server.use(errorHandler);

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
