import * as ErrorType from "../errors/error-type.js";
import * as ServerError from "../errors/server-error.js";
import connection from "./connection-wrapper.js";

// follow a new vacation
async function followNewVacation(userId, vacationId) {
  let sql = `INSERT INTO followers (user_id , vacation_id)
    VALUES (?,?)`;

  let parameters = [userId, vacationId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId, vacationId), e);
  }
}

// remove a follow from a vacation
async function removeFollow(userId, vacationId) {
  const sql = ` DELETE FROM Followers WHERE vacation_id=? AND user_id =?;`;
  let parameters = [userId, vacationId];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(registrationData), e);
  }
}

// // get number of follow a vacation has
// async function getNumberOfFollowsAsync(vacationId) {
//   const sql = `SELECT COUNT(F.vacationId) AS 'followersCount', V.vacationId, V.destination
//                 FROM follows AS F JOIN vacations AS V
//                 ON F.vacationId = V.vacationId
//                 WHERE F.vacationId = ${vacationId};`;
//   try {
//     const numberOfFollows = await connection.execute(sql);
//     return numberOfFollows[0];
//   } catch (e) {
//      throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(registrationData), e);
//   }
// }

export default {
  followNewVacation,
  removeFollow,
  // getNumberOfFollowsAsync,
};
