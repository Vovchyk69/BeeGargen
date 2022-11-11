const Resourse = require("../models/resource");
const { ObjectId } = require("mongoose").Types;
const GoogleCloudStorage = require("./googleCloudStorage");
const logger = require("../services/logger").child({
  namespace: "resource.service",
});

module.exports.create = async (data, user) => {
  const resource = await Resourse.create({
    title: data.title,
    notes: data.notes,
    image: data.image,
    user: user.id,
  });

  return resource;
};

module.exports.getById = async (id, userId) => {
  const resource = await Resourse.findOne({ _id: id, user: ObjectId(userId) });

  return resource;
};

module.exports.getByUser = async (userId) => {
  const resources = await Resourse.aggregate([
    {
      $match: {
        user: ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "media",
        localField: "_id",
        foreignField: "resource",
        as: "media",
      },
    },
    {
      $project: {
        title: 1,
        notes: 1,
        image: 1,
        media: {
          $size: "$media",
        },
      },
    },
  ]);

  return resources;
};

module.exports.update = async (data, userId) => {
  const resource = await Resourse.findOneAndUpdate(
    { _id: data._id, user: userId },
    {
      $set: {
        title: data.title,
        notes: data.notes,
        image: data.image,
      },
    },
    {
      new: true,
    }
  );

  return resource;
};

module.exports.delete = async (id, userId) => {
  const resource = await Resourse.findOneAndDelete({
    _id: ObjectId(id),
    user: ObjectId(userId),
  });
  if (resource && resource.image !== undefined) {
    await GoogleCloudStorage.deleteObject(resource.image).catch(logger.error);
  }
  return true;
};
