const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../services/auth");
const MediaService = require("../services/media");
const logger = require("../services/logger").child({
  namespace: "media.router",
});
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", isAuthorized, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) throw new Error("No image attached");
    if (!req.body.resource) throw new Error("No resource id");
    const data = await MediaService.create(
      req.file.buffer,
      req.user,
      req.body.resource
    );
    return res.json({
      err: false,
      data,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

router.get("/:id", isAuthorized, async (req, res) => {
  try {
    const data = await MediaService.get(req.params.id, req.user.id);
    return res.send({
      err: false,
      data,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

router.get("/resource/:id", isAuthorized, async (req, res) => {
  try {
    const data = await MediaService.getByResource(req.params.id, req.user.id);
    return res.send({
      err: false,
      data,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

router.put("/", isAuthorized, async (req, res) => {
  try {
    const { _id, imageText } = req.body;
    const { user } = req;
    if (!_id) throw new Error("NO_MEDIA_ID_PASSED");
    if (!imageText) throw new Error("NO_MEDIA_TEXT_PASSED");
    const data = await MediaService.update(_id, user.id, imageText);
    return res.send({
      err: false,
      data,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await MediaService.delete(req.params.id, req.user.id);
    return res.send({ err: false, data });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

module.exports = router;
