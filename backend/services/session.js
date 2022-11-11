const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const connection = require("../db");

const sessionStore = new MongoStore({
  mongooseConnection: connection,
});

module.exports = sessionStore;
