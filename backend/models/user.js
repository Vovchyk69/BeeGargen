const { Schema } = require("mongoose");
const { dbConnection } = require("../db/connections");

const userSchema = new Schema(
  {
    firstName: {
      require: true,
      type: String,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: String,
    accessToken: { type: String, select: false },
    googleId: { type: String, select: false },
  },
  {
    timestamps: {
      createdAt: "timestamps.createdAt",
      updatedAt: "timestamps.updatedAt",
    },
  }
);

userSchema.index({ email: 1 });
userSchema.index({ accessToken: 1 });

module.exports = dbConnection.model("User", userSchema);
