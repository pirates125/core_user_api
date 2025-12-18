const users = require("../data/users.data.js");
const { HttpError } = require("../errors/http-error.js");
const { log } = require("../utils/logger.js");
const {
  findUserById,
  createUser,
  findAllUsers,
  findUserByName,
  updateUserById,
} = require("../repository/user.repository.js");

// User service
// Contains business-related logic (currently minimal)

async function getAllUsersService() {
  const users = await findAllUsers();

  return users;
}

async function getUserService(id) {
  if (!id) {
    throw new HttpError(400, "Id is required.");
  }

  const user = await findUserById(id);

  if (!user) {
    throw new HttpError(404, "User not found.");
  }

  return user;
}

async function createUserService(user) {
  if (!user.name) {
    throw new HttpError(400, "name is required");
  }

  const existingUser = await findUserByName(user.name);

  if (existingUser) {
    throw new HttpError(409, "user with this name already exists");
  }

  const newUser = await createUser(user.name);
  return newUser;
}

async function updateUserService(id, payload) {
  if (!id) {
    throw new HttpError(400, "id is required");
  }

  if (!payload || Object.keys(payload).length === 0) {
    throw new HttpError(400, "update payload is required");
  }

  const existingUser = await findUserById(id);
  if (!existingUser) {
    throw new HttpError(404, "user not found");
  }

  if (payload.name) {
    const userWithSameName = await findUserByName(payload.name);

    if (userWithSameName && userWithSameName.id !== id) {
      throw new HttpError(409, "user with this name already exists");
    }
  }

  const updatedUser = await updateUserById(id, payload.name);
  return updatedUser;
}

module.exports = {
  getUserService,
  createUserService,
  getAllUsersService,
  updateUserService,
};
