const express = require("express");
const router = express.Router();
const logger = require("../services/logger").child({ namespace: "auth.router" });
const passport = require("../services/passport");
const { isAuthorized } = require("../services/auth");
const UserService = require("../services/user");

router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  async (req, res) => {
    try {
      return res.redirect(301, `${process.env.UI_URL}/resources`);
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, data: error.message });
    }
  }
);

router.get("/logout", isAuthorized, async (req, res) => {
  try {
    req.logout();
    return res.send({ err: false, data: true });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

router.get("/logout-force", async (req, res) => {
  try {
    await UserService.logoutForce(req.user);
    req.logOut();
    return res.send({ err: false, data: true });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

router.get("/me", isAuthorized, async (req, res) => {
  try {
    return res.send({
      err: false,
      data: req.user,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

module.exports = router;
