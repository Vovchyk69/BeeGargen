const mongoose = require("mongoose");
const logger = require("../services/logger").child({
  namespace: "db",
});

module.exports = mongoose.createConnection(
  process.env.MONGODB_URI,
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      logger.error("Mongoose connection failed: ", err);
    }
  }
);
