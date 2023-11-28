const router = require("express").Router();
const point = require("../controllers/point");

router.post("/createpoint", point.createPoint);

module.exports = router;
