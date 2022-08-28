import * as followDao from "../dao/follow-dao.js";

async function followNewVacation(userId, vacationId) {
  await followDao.followNewVacation(userId, vacationId);
}

async function removeFollow(userId, vacationId) {
  await followDao.removeFollow(userId, vacationId);
}

export default {
  followNewVacation,
  removeFollow,
};
