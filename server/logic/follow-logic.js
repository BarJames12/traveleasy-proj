const followDao = require("../dao/follow-dao");

async function followNewVacation(userId, vacationId) {
  await followDao.followNewVacation(userId, vacationId);
}

async function removeFollow(userId, vacationId) {
  await followDao.removeFollow(userId, vacationId);
}


module.exports = {
  followNewVacation,
  removeFollow,
};
