import * as usersLogic from "../logic/users-logic.js";
import express from "express";
const router = express.Router();




router.post("/", async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  let registrationData = request.body;
  try {
    let userData = await usersLogic.addUser(registrationData);
    response.json(userData);
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  let username = request.body.username;
  let password = request.body.password;
  try {
    let userData = await usersLogic.login(username, password);
    response.json(userData);
  } catch (error) {
    return next(error);
  }
});

export default {router};
