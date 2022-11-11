const { Schema } = require("mongoose");
const { dbConnection } = require("../db/connections");
const { ObjectId } = require("mongoose").Types;

const mediaSchema = new Schema(
  {
    imageLinkURL: {
      type: String,
      required: true,
    },
    imageAudioURL: {
      type: String,
      required: true,
    },
    imageText: {
      type: String,
      required: true,
    },
    locale: {
      type: String,
      required: true,
    },
    ssmlTextMarkup: {
      type: String,
      select: false,
    },
    isTextEdited: {
      type: Boolean,
      default: false,
    },
    audioDuration: {
      type: Number,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    resource: {
      type: ObjectId,
      ref: "Resource",
    },
  },
  {
    timestamps: {
      createdAt: "timestamps.createdAt",
      updatedAt: "timestamps.updatedAt",
    },
  }
);

module.exports = dbConnection.model("Media", mediaSchema);
