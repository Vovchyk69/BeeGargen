const Media = require("../models/media");
const GoogleImageToText = require("../services/googleImageToText");
const GoogleTextToSpeach = require("../services/googleTextToSpeachApi");
const GoogleCloudStorage = require("../services/googleCloudStorage");
const getMP3Duration = require("get-mp3-duration");

process.send("Inited");

process.on("message", async (data) => {
  try {
    if (
      data.image !== undefined &&
      data.userId !== undefined &&
      data.resourceId !== undefined
    ) {
      const { image, userId, resourceId } = data;
      process.send("data received");

      const imageBuffer = Buffer.from(image);

      const { text: imageText, locale } = await GoogleImageToText.getText(
        imageBuffer
      );
      process.send("Got text from image");

      const ssmlTextMarkup = GoogleTextToSpeach.getSSML(imageText);
      process.send("Generated ssml");

      const audio = await GoogleTextToSpeach.getAudio(ssmlTextMarkup, locale);
      const duration = getMP3Duration(audio);
      process.send(`Generated audio from ssml with duration of ${duration}ms`);

      const imageAudioURL = await GoogleCloudStorage.uploadObject(audio);
      const imageLinkURL = await GoogleCloudStorage.uploadObject(imageBuffer);
      process.send("Uploaded audio and image to google cloud storage");

      const media = await Media.create({
        imageLinkURL,
        imageAudioURL,
        imageText,
        locale,
        ssmlTextMarkup,
        user: userId,
        resource: resourceId,
        audioDuration: duration || 0,
      });
      process.send(`Media created: ${media._id}`);

      process.send("Finished");
      process.exit();
    }
  } catch (error) {
    process.send("Error occured!");
    console.error(error);
    process.exit();
  }
});
