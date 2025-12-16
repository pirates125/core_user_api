const users = require("../data/users.data.js");
const { HttpError } = require("../errors/http-error.js");

// User service
// Contains business-related logic (currently minimal)

function getUsersService() {
  return users;
}

function createUserService(user) {
  if (!user.name) {
    throw new HttpError(400, "user name is required.");
  }
  users.push(user);
  return user;
}

module.exports = {
  getUsersService,
  createUserService,
};
