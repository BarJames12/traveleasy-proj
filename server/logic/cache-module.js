let tokenToUserDetailsMap = new Map();


async function get(token) {
  if (token == null) {
    throw new Error("Invalid key, failed to retrieve data from cache");
  }
  return tokenToUserDetailsMap.get(token);
}

async function set(token, userData) {
  tokenToUserDetailsMap.set(token, userData);
}

function extractUserDataFromCache(request) {
  let authorizationString = request.headers["authorization"];
  let token = authorizationString.substring("Bearer ".length);
  console.log(token);
  let userData = get(token);
  return userData;
  // return { userData, token };
}

export default {
  set,
  get,
  extractUserDataFromCache,
};
