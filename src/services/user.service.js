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

function updateUserService(id, updateData) {
  if (!updateData.name) {
    throw new HttpError(400, "name is required");
  }

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    throw new HttpError(404, "user not found");
  }

  const updatedUser = {
    ...users[userIndex],
    ...updateData,
  };

  users[userIndex] = updatedUser;

  log("info", "user updated", {
    userId: id,
  });

  return updatedUser;
}

module.exports = {
  getUsersService,
  createUserService,
  updateUserService,
};
