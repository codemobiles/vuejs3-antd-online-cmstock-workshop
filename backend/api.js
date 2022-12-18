const express = require("express");
const router = express.Router();

router.use(require("./api_authen"))
router.use(require("./api_stock"))

module.exports = router;
