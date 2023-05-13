require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const logger = require("./services/logger").child({ namespace: "app" });
const passport = require("./services/passport.js");
const session = require("express-session");
const sessionStore = require("./services/session");
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.use(require("cookie-parser")());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny", { stream: logger.winstonStream }));
app.use(
  session({
    name: "api",
    store: sessionStore,
    secret: "asdovi[janjv9ew03neom",
    resave: false,
    saveUninitialized: false,
  }),
  passport.initialize(),
  passport.session()
);

app.disable("x-powered-by");

app.use("/api", require("./routes"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'../frontend/dist'));
});

const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

app.use((err, req, res, _next) => {
  const { message } = err;
  let statusCode = 500;
  if (message === "Unauthorized") {
    statusCode = 401;
    logger.warn(err);
  } else {
    logger.error(err);
  }

  res.status(statusCode);

  res.json({
    error: true,
    data: message,
  });
});

process
  .on("unhandledRejection", (reason, p) => {
    logger.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    logger.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

module.exports = app;
