const path = require("path");
const { fork } = require("child_process");
const logger = require("./logger").child({
  namespace: "media.service.create",
});

function run(image, userId, resourceId) {
  const executor = fork(path.join(__dirname, "./media-create-executor.js"));
  executor.send({ image, userId, resourceId });
  executor.on("message", (msg) =>
    logger.info(`Executor PID: ${executor.pid} - ${msg}`)
  );
  return true;
}

module.exports = run;
