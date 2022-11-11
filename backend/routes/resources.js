const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../services/auth");
const ResourcesService = require("../services/resources");
const MediaService = require("../services/media");
const logger = require("../services/logger").child({
  namespace: "resources.router",
});

router.post("/", isAuthorized, async (req, res) => {
  try {
    const resource = await ResourcesService.create(req.body, req.user);

    return res.json({
      err: false,
      data: resource.toJSON(),
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

router.get("/:id", isAuthorized, async (req, res) => {
  try {
    return res.send({
      err: false,
      data: await ResourcesService.getById(req.params.id, req.user.id),
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

router.get("/", isAuthorized, async (req, res) => {
  try {
    return res.send({
      err: false,
      data: await ResourcesService.getByUser(req.user.id),
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

router.put("/", isAuthorized, async (req, res) => {
  try {
    return res.send({
      err: false,
      data: await ResourcesService.update(req.body, req.user._id),
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

router.delete("/:id", isAuthorized, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("PROVIDE_RESOURCE_ID");
    await ResourcesService.delete(id, req.user.id);
    await MediaService.deleteByResource(id, req.user.id);
    return res.send({ err: false, data: true });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, data: error.message });
  }
});

module.exports = router;
