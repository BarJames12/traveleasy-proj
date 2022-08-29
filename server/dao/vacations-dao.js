import connection from "./connection-wrapper.js";
import * as ErrorType from "../errors/error-type.js";
import * as ServerError from "../errors/server-error.js";

async function getAllVacations(userId, userType) {
  let sql;
  if (userType == "ADMIN") {
    console.log("===========================");
    console.log(userType);
    console.log("===========================");
    sql = `SELECT 
  v.vacation_id AS vacationId,
  v.location,
  v.description,
  v.image,
  DATE_FORMAT(v.start_date, "%Y-%m-%d") AS start_date,
  DATE_FORMAT(v.end_date, "%Y-%m-%d") AS end_date,
  v.price,
  CASE
      WHEN followed.vacation_id IS NOT NULL THEN true
      ELSE false
  END AS 'isFollowed',
  CASE
      WHEN fv.followers IS NOT NULL THEN fv.followers
      ELSE 0
  END AS 'amountOfFollowers'
FROM
  current_deals v
      LEFT JOIN
  (SELECT 
      vacation_id
  FROM
      followers
  WHERE
      user_id = ?) followed ON v.vacation_id = followed.vacation_id
      LEFT JOIN
  (SELECT 
      vacation_id, COUNT(vacation_id) AS 'followers'
  FROM
      followers
  GROUP BY vacation_id) fv ON v.vacation_id = fv.vacation_id
  ORDER BY amountOfFollowers DESC`; // order by amount of follower for admin
  } else {
    sql = `SELECT 
  v.vacation_id AS vacationId,
  v.location,
  v.description,
  v.image,
  DATE_FORMAT(v.start_date, "%Y-%m-%d") AS start_date,
  DATE_FORMAT(v.end_date, "%Y-%m-%d") AS end_date,
  v.price,
  CASE
      WHEN followed.vacation_id IS NOT NULL THEN true
      ELSE false
  END AS 'isFollowed',
  CASE
      WHEN fv.followers IS NOT NULL THEN fv.followers
      ELSE 0
  END AS 'amountOfFollowers'
FROM
  current_deals v
      LEFT JOIN
  (SELECT 
      vacation_id
  FROM
      followers
  WHERE
      user_id = ?) followed ON v.vacation_id = followed.vacation_id
      LEFT JOIN
  (SELECT 
      vacation_id, COUNT(vacation_id) AS 'followers'
  FROM
      followers
  GROUP BY vacation_id) fv ON v.vacation_id = fv.vacation_id
  ORDER BY isFollowed DESC`; // order by user followed vacation.
  }

  try {
    let parameters = [userId];
    let allVacations = await connection.executeWithParameters(sql, parameters);
    return allVacations;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(allVacations), e);
  }
}

async function addVacation(vacationData) {
  const sql = `INSERT INTO current_deals (image, location, description,start_date,end_date,price)
VALUES (?,?,?,?,?,?);`;

  let parameters = [
    vacationData.image,
    vacationData.location,
    vacationData.description,
    vacationData.startDate,
    vacationData.endDate,
    vacationData.price,
  ];

  try {
    console.log(sql);
    console.log(parameters);
    let newVacationData = await connection.executeWithParameters(sql, parameters);
    console.log(newVacationData);
    return newVacationData.vacation_id;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(vacationData), e);
  }
}

async function updateVacation(vacationId, vacationData) {
  let sql =
    "UPDATE current_deals SET image=?, location=?, description=?, start_date=?,end_date=?,price=? WHERE vacation_id=? ";
  let parameters = [
    vacationData.image,
    vacationData.location,
    vacationData.description,
    vacationData.startDate,
    vacationData.endDate,
    vacationData.price,
    vacationId,
  ];
  try {
    let updatedVacationData = await connection.executeWithParameters(sql, parameters);
    return updatedVacationData;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(updatedVacationData), e);
  }
}

async function deleteVacation(vacationId) {
  let sql = `DELETE FROM current_deals WHERE vacation_id=?`;

  let parameters = [vacationId];
  console.log(vacationId);
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(vacationId), e);
  }
}

async function deleteVacationFromFollowes(vacationId) {
  let sql = `DELETE FROM followers WHERE vacation_id=?`;

  let parameters = [vacationId];
  console.log(vacationId);
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(vacationId), e);
  }
}

export default {
  getAllVacations,
  addVacation,
  updateVacation,
  deleteVacation,
  deleteVacationFromFollowes,
};
