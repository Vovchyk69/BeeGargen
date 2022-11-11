const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/resources", require("./resources"));
router.use("/images", require("./images"));
router.use("/media", require("./media"));

module.exports = router;
