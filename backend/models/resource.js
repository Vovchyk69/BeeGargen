const { Schema } = require("mongoose");
const { dbConnection } = require("../db/connections");
const { ObjectId } = require("mongoose").Types;

const resourceSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    notes: {
      type: String,
    },
    image: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: "timestamps.createdAt",
      updatedAt: "timestamps.updatedAt",
    },
  }
);

module.exports = dbConnection.model("Resource", resourceSchema);
