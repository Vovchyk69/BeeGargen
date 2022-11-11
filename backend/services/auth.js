const User = require("../models/user");

module.exports.isAuthorized = (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      res.status(401);
      return res.send();
    }
    next();
  } catch (e) {
    return next(e);
  }
};

module.exports.login = async (userInfo, accessToken) => {
  const existsInDb = await User.findOne({ googleId: userInfo.sub });
  let returnedUser;

  if (!existsInDb) {
    returnedUser = await User.create({
      email: userInfo.email,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      googleId: userInfo.sub,
      picture: userInfo.picture,
      locale: userInfo.locale,
      accessToken,
    });
  } else {
    returnedUser = await User.findByIdAndUpdate(
      existsInDb.id,
      {
        $set: {
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          googleId: userInfo.sub,
          picture: userInfo.picture,
          locale: userInfo.locale,
          accessToken,
        },
      },
      { new: true }
    );
  }

  return returnedUser;
};
