import * as vacationsDao from "../dao/vacations-dao.js";
import * as ErrorType from "../errors/error-type.js";
import * as ServerError from "../errors/server-error.mjs";

async function getAllVacations(userId, userType) {
  let allVacations = await vacationsDao.getAllVacations(userId, userType);
  for (let i = 0; i < allVacations.length; i++) {
    if (allVacations[i].isFollowed == 1) {
      allVacations[i].isFollowed = true;
    } else {
      allVacations[i].isFollowed = false;
    }
  }
  return allVacations;
}

async function addVacation(vacationData) {
  validateVacationDetalis(vacationData);
  await vacationsDao.addVacation(vacationData);
}

async function updateVacation(vacationId, vacationData) {
  validateVacationDetalis(vacationData);
  await vacationsDao.updateVacation(vacationId, vacationData);
}

async function deleteVacation(vacationId) {
  await vacationsDao.deleteVacation(vacationId);
  await vacationsDao.deleteVacationFromFollowes(vacationId);
}

function validateVacationDetalis(vacationData) {
  if (!vacationData.image) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!vacationData.location) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!vacationData.description) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!vacationData.startDate) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!vacationData.endDate) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (!vacationData.price) {
    throw new ServerError(ErrorType.EMPTY_FIELD);
  }
  if (vacationData.endDate <= vacationData.startDate) {
    throw new ServerError(ErrorType.INVALID_DATE);
  }
}

export default {
  getAllVacations,
  addVacation,
  updateVacation,
  deleteVacation,
};
