const AuthService = require("./auth");
const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return done(null, null);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await AuthService.login(profile._json, accessToken);
        done(null, user.toJSON());
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
