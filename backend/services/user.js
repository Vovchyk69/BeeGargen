const User = require("../models/user");
const Resource = require("../models/resource");
const Media = require("../models/media");
const logger = require("../services/logger").child({
  namespace: "user.service",
});
const MediaService = require("./media");
const ResourceService = require("./resources");

/**
 * @description Delets user and all his related records in db
 */
module.exports.logoutForce = async (userId) => {
  const mediaIds = await Media.find({ user: Object(userId) }).select("_id");
  const resourceIds = await Resource.find({ user: Object(userId) })
    .select("_id")
    .lean();
  const res = await Promise.all([
    ...resourceIds.map((r) =>
      ResourceService.delete(r._id, userId)
        .then((r) =>
          logger.info(`Resource deleted: result ${JSON.stringify(r)}`)
        )
        .catch((e) => {
          logger.error(`Resource was not deleted ${String(r.id)} `, e);
        })
    ),
    ...mediaIds.map((m) =>
      MediaService.delete(m._id, userId)
        .then((r) => logger.info(`Media deleted: result ${JSON.stringify(r)}`))
        .catch((e) => {
          logger.error(`Media was not deleted ${String(m.id)} `, e);
        })
    ),
    User.findByIdAndDelete(userId),
  ]);

  logger.debug(
    `Successfuly delete user and his relations ${JSON.stringify(res)}`
  );

  return true;
};
