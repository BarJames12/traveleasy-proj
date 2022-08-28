

import request from "express";
import expressJwt from "../errors/error-type";
import config from "../logic/config.json";


// Extracting the text from the secret's JSON
let { secret } = config;

let whiteListUrls = new Set();
whiteListUrls.add("/login");
whiteListUrls.add("/register");
whiteListUrls.add("users/");


function authenticateJwtRequestToken() {
  // Load secret into
  return expressJwt({ secret, algorithms: ["sha1", "RS256", "HS256"] }).unless((request) => {
    if (request == "POST" && request.url.endWith("/users/")) {
      console.log("It's true");
      return true;
    }

    if (whiteListUrls.has(request.url)) {
      return true;
    }
  });
}



export default authenticateJwtRequestToken;
