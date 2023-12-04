const router = require("express").Router();
const point = require("../controllers/point");
const middlewares = require("../middlewares/verifyToken");

//crud point
router.post(
  "/createpoint",
  [middlewares.verifyToken, middlewares.isManager],
  point.createPoint
);

router.put(
  "/updatepoint/:pid",
  [middlewares.verifyToken, middlewares.isManager],
  point.updatePoint
);

router.get(
  "/",
  [middlewares.verifyToken, middlewares.isManager],
  point.getPoint
);

router.delete(
  "/deletepoint/:pid",
  [middlewares.verifyToken, middlewares.isManager],
  point.deletePoint
);

module.exports = router;
