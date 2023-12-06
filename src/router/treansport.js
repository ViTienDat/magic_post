const router = require("express").Router();
const transport = require("../controllers/transport");
const middlewares = require("../middlewares/verifyToken");

router.post(
  "/create",
  [middlewares.verifyToken, middlewares.isStaff],
  transport.crreateTp
);

router.get(
  "/sendstaff",
  [middlewares.verifyToken, middlewares.isStaff],
  transport.getTpSendByStaff
);

router.get(
  "/receivestaff",
  [middlewares.verifyToken, middlewares.isStaff],
  transport.getTpReciveByStaff
);

router.put(
  "/completedtp/:tid",
  [middlewares.verifyToken, middlewares.isStaff],
  transport.completedTp
);

router.put(
  "/wrongtp/:tid",
  [middlewares.verifyToken, middlewares.isStaff],
  transport.wrongTp
);

module.exports = router;
