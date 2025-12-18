const users = require("../data/users.data.js");
const { HttpError } = require("../errors/http-error.js");
const { log } = require("../utils/logger.js");
const {
  findUserById,
  createUser,
  findAllUsers,
  findUserByName,
  updateUserById,
  softDeleteUserById,
} = require("../repository/user.repository.js");

// User service
// Contains business-related logic (currently minimal)

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

const ALLOWED_SORT_FIELDS = ["id", "name"];
const ALLOWED_ORDER = ["asc", "desc"];

async function getAllUsersService(query) {
  let limit = Number(query.limit) || DEFAULT_LIMIT;
  let offset = Number(query.offset) || 0;

  if (limit > MAX_LIMIT) limit = MAX_LIMIT;
  if (limit < 1) limit = DEFAULT_LIMIT;
  if (offset < 0) offset = 0;

  const filters = {};
  if (query.name) {
    filters.name = query.name;
  }

  let sort = "id";
  if (ALLOWED_SORT_FIELDS.includes(query.sort)) {
    sort = query.sort;
  }

  let order = "asc";
  if (ALLOWED_ORDER.includes(query.order)) {
    order = query.order;
  }

  return findAllUsers({
    limit,
    offset,
    filters,
    sort,
    order,
  });
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

async function deleteUserService(id) {
  if (!id) {
    throw new HttpError(400, "id is required");
  }

  const deletedUser = await softDeleteUserById(id);

  if (!deletedUser) {
    throw new HttpError(404, "user not found or already deleted");
  }

  return deletedUser;
}

module.exports = {
  getUserService,
  createUserService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
};
