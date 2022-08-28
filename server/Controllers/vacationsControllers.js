import express from "express";
const router = express.Router();

import * as vacationsLogic from "../logic/vacations-logic.js";
import * as cacheModule from "../logic/cache-module.js";

router.get("/", async (request, response, next) => {
  try {
    let userData = await cacheModule.extractUserDataFromCache(request);
    let userId = userData.userId;
    let userType = userData.userType;
    let vacations = await vacationsLogic.getAllVacations(userId, userType);
    response.json(vacations);
    console.log(vacations);
  } catch (error) {
    return next(error);
  }
});

router.post("/add-vacation", async (request, response, next) => {
  let vacationData = request.body;
  try {
    let newVacationData = await vacationsLogic.addVacation(vacationData);
    response.json(newVacationData);
  } catch (error) {
    return next(error);
  }
});

router.put("/update-vacation/:id", async (request, response, next) => {
  let vacationId = request.params.id;
  let vacationData = request.body;
  console.log(vacationId);

  try {
    await vacationsLogic.updateVacation(vacationId, vacationData);
    response.json();
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  let vacationId = request.params.id;
  console.log(vacationId);

  try {
    await vacationsLogic.deleteVacation(vacationId);
    response.json();
  } catch (e) {
    return next(error);
  }
});

export default router;
