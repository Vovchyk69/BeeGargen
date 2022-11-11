const mongoose = require("mongoose");
const Promise = require("bluebird");
const logger = require("../services/logger").child({ namespace: "db.connection" });

mongoose.Promise = Promise;

const dbOptions = {
  socketTimeoutMS: 60000,
  keepAlive: true,
  reconnectTries: 30,
  authSource: "admin",
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const connections = {
  dbConnection: mongoose.createConnection(),
  dbOptions,
};

let dbURI;

if (process.env.ENV !== "test" && process.env.MONGODB_URI) {
  dbURI = process.env.MONGODB_URI.trim();
  connections.dbConnection.openUri(dbURI, dbOptions);
} else {
  logger.warn("Connection string is not provided");
}

connections.dbConnection
  .once("open", () => {
    logger.info(`Mongo DB connected successfully to: ${dbURI}`);
  })
  .on("error", (err) => {
    logger.error(err);
    process.exit(1);
  })
  .on("close", () => {
    logger.info("Mongo DB closed connection");
  });

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info("Mongoose default connection is disconnected");
    process.exit(0);
  });
});

module.exports = connections;
