const Media = require("../models/media");
const GoogleTextToSpeach = require("../services/googleTextToSpeachApi");
const GoogleCloudStorage = require("../services/googleCloudStorage");
const logger = require("../services/logger").child({
  namespace: "media.service",
});
const { ObjectId } = require("mongoose").Types;
const CreateMediaProcess = require("./media-create-producer");
const getMP3Duration = require("get-mp3-duration");

/**
 * @param {Buffer} image
 * @param {string} userId
 * @param {string} resourceId
 */
module.exports.create = async (image, userId, resourceId) => {
  if (!image) {
    throw new Error("NO_IMAGE_SET");
  }
  if (!userId) {
    throw new Error("NO_USER_SET");
  }
  if (!resourceId) {
    throw new Error("NO_RESOURCE_SET");
  }

  CreateMediaProcess(image, userId, resourceId);

  return true;
};

/**
 * @param {string} resourceId
 * @param {string} userId
 */
module.exports.delete = async (mediaId, userId) => {
  const media = await Media.findOneAndDelete({
    _id: ObjectId(mediaId),
    user: ObjectId(userId),
  }).lean();

  if (!media) throw new Error("MEDIA_WAS_NOT_FOUND");

  const { imageAudioURL, imageLinkURL } = media;

  await Promise.all([
    GoogleCloudStorage.deleteObject(imageAudioURL).catch(logger.error),
    GoogleCloudStorage.deleteObject(imageLinkURL).catch(logger.error),
  ]);

  return true;
};

/**
 * @param {string} mediaId
 * @param {string} userId
 */
module.exports.get = async (mediaId, userId) => {
  const media = await Media.findOne({ _id: mediaId, user: userId }).populate(
    "resource"
  );
  return media.toJSON();
};

/**
 * @param {string} mediaId
 * @param {string} userId
 * @param {string} mediaText
 */
module.exports.update = async (mediaId, userId, imageText) => {
  const media = await Media.findOne({ _id: mediaId, user: userId });
  if (!media) throw new Error("NO_MEDIA_FOUND");

  const ssmlTextMarkup = GoogleTextToSpeach.getSSML(imageText);
  const audio = await GoogleTextToSpeach.getAudio(ssmlTextMarkup, media.locale);
  const duration = getMP3Duration(audio);
  const imageAudioURL = await GoogleCloudStorage.uploadObject(audio);
  await GoogleCloudStorage.deleteObject(media.imageAudioURL).catch(
    logger.error
  );
  await media
    .set({
      imageAudioURL,
      ssmlTextMarkup,
      imageText,
      audioDuration: duration,
      isTextEdited: true,
    })
    .save();
  return media.toJSON();
};

module.exports.getByResource = async (resourceId, userId) => {
  const media = await Media.find({
    user: userId,
    resource: resourceId,
  }).sort({ 'timestamps.createdAt': -1 });

  const readyMedia = media.map((media) => {
    const { imageText, ...rest } = media.toJSON();
    const textShrinked = imageText.substring(0, 150);
    return {
      imageText: `${textShrinked}...`,
      ...rest,
    };
  });
  return readyMedia;
};

module.exports.deleteByResource = async (resourceId, userId) => {
  const mediaIds = await Media.find({
    user: Object(userId),
    resource: ObjectId(resourceId),
  }).select("_id");
  await Promise.all(
    mediaIds.map((m) =>
      this.delete(m._id, userId)
        .then((r) => logger.info(`Media deleted: result ${JSON.stringify(r)}`))
        .catch((e) => {
          logger.error(`Media was not deleted ${String(m.id)} `, e);
        })
    )
  );

  return true;
};
