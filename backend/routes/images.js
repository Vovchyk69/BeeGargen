const express = require("express");
const router = express.Router();
const logger = require("../services/logger").child({ namespace: "images.router" });
const GoogleCloudStorage = require("../services/googleCloudStorage");
const { isAuthorized } = require("../services/auth");
const multer = require("multer");
const { log } = require("../services/logger");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload",
  isAuthorized,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) throw new Error("No file attached");
      const imageUrl = await GoogleCloudStorage.uploadObject(req.file.buffer);

      return res.json({
        err: false,
        data: imageUrl,
      });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ error: true, data: error.message });
    }
  }
);

router.delete("/", isAuthorized, async (req, res) => {
  try {
    const data = await GoogleCloudStorage.deleteObject(req.body.data);
    return res.json({
      err: false,
      data,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

module.exports = router;
