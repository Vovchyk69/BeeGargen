const { Storage } = require("@google-cloud/storage");
const path = require("path");
const storage = new Storage({
  keyFilename: path.join(__dirname, "../heard-278900-516c484e725f.json"),
  projectId: "heard-278900",
});
const { Duplex } = require("stream");
const FileType = require("file-type");
const generateId = require("uniqid");
const { GOOGLE_STORAGE_BUCKET } = process.env;

/**
 * @param {Buffer} buffer
 * @returns {string} link to image
 */
module.exports.uploadObject = async (buffer) => {
  const localReadStream = new Duplex();
  localReadStream.push(buffer);
  localReadStream.push(null);

  const { ext, mime } = await FileType.fromBuffer(buffer);
  const filename = `${generateId()}.${ext}`;

  const remoteWriteStream = storage
    .bucket(GOOGLE_STORAGE_BUCKET)
    .file(filename)
    .createWriteStream({
      metadata: {
        contentType: mime,
      },
    });

  await new Promise((resolve, reject) =>
    localReadStream
      .pipe(remoteWriteStream)
      .on("error", reject)
      .on("finish", resolve)
  );

  return `https://storage.googleapis.com/${GOOGLE_STORAGE_BUCKET}/${filename}`;
};

/**
 * @param {string} imageUrl
 */
module.exports.deleteObject = async (objectUrl) => {
  const imageName = new URL(objectUrl).pathname.split(
    `${GOOGLE_STORAGE_BUCKET}/`
  )[1];
  await storage.bucket(GOOGLE_STORAGE_BUCKET).file(imageName).delete();
  return true;
};
