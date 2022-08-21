const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");


async function isUserExistByUserName(registrationData) {
  let sql = `SELECT * FROM Users WHERE user_name=? `;
  let parameters = [registrationData.username];
    const userNameResult = await connection.executeWithParameters(sql, parameters);
    return userNameResult;
}


async function addUser(registrationData) {
  const sql = `INSERT INTO Users (first_name, last_name, user_name,email, password,user_type)
VALUES (?,?,?,?,?,?);`;

  let userType = "USER";

  parameters = [
    registrationData.firstName,
    registrationData.lastName,
    registrationData.username,
    registrationData.email,
    registrationData.password,
    userType,
  ];

  try {
    let userData = await connection.executeWithParameters(sql, parameters);
    console.log(userData);
    return userData.user_id;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(registrationData), e);
  }
}


async function login(username, password) {
  let sql = `SELECT user_id AS userId , first_name AS "firstName", user_type AS "userType" FROM Users WHERE user_name=? and password =?
`;

  // console.log(loginData);
  let parameters = [username, password];

  let usersLoginResult;

  try {
    usersLoginResult = await connection.executeWithParameters(sql, parameters);
    
    console.log("all good");
    return usersLoginResult[0];
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(username, password), e);
  }
}

module.exports = {
  addUser,
  login,
  isUserExistByUserName,
};
