const followLogic = require("../logic/follow-logic");
const express = require("express");
const router = express.Router();
const cacheModule = require("../logic/cache-module");


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
