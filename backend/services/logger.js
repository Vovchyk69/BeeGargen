const { createLogger, format, transports } = require("winston");

const isLocal = process.env.LOC === "true";
const isTest = process.env.ENV === "test";

const formatParams = (info) => {
  const { level, namespace, message, stack } = info;
  const pathStartIndex = stack && stack.indexOf("\n") + 1;
  const stackPath = stack && stack.slice(pathStartIndex).trim();
  const stackToDisplay = level.includes("error")
    ? JSON.stringify({ stack: stackPath })
    : "";
  return `${level}: \t[${namespace || "none"}] ${message} ${stackToDisplay}`;
};

const developmentFormat = format.combine(
  format.colorize(),
  format.errors({ stack: true }),
  format.printf(formatParams)
);

const productionFormat = format.combine(
  format.errors({ stack: true }),
  format.printf(formatParams)
);

const logLevel = isLocal ? "debug" : "info";
const logFormat = isLocal ? developmentFormat : productionFormat;

const logger = createLogger({
  silent: isTest,
  level: logLevel,
  format: logFormat,
  transports: [new transports.Console()],
});

module.exports = logger;
