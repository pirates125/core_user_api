const users = require("../data/users.data.js");

// User service
// Contains business-related logic (currently minimal)

function getUsersService() {
  return users;
}
module.exports = {
  getUsersService,
};
