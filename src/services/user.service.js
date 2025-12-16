const users = require("../data/users.data.js");
const { HttpError } = require("../errors/http-error.js");
const { log } = require("../utils/logger.js");

// User service
// Contains business-related logic (currently minimal)

function getUsersService() {
  return users;
}

function createUserService(user) {
  if (!user.name) {
    throw new HttpError(400, "user name is required.");
  }

  log("info", "User creation requested", {
    name: user.name,
  });

  return user;
}

module.exports = {
  getUsersService,
  createUserService,
};
