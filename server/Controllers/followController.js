import express from "express";
const router = express.Router();
import * as followLogic from "../logic/follow-logic.js";
import * as cacheModule from "../logic/cache-module.js";

router.post("/", async (request, response, next) => {
  try {
    let vacationId = request.body.vacationId;
    let userData = await cacheModule.extractUserDataFromCache(request);
    let userId = userData.userId;

    await followLogic.followNewVacation(userId, vacationId);
    response.json();
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    let userData = await cacheModule.extractUserDataFromCache(request);
    let userId = userData.userId;
    let vacationId = request.params.id;

    await followLogic.removeFollow(vacationId, userId);
    response.json();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
