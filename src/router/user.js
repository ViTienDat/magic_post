const router = require("express").Router();
const user = require("../controllers/user");
const middlewares = require("../middlewares/verifyToken");

router.post("/create", user.createUser);
router.post("/login", user.login);
router.post(
  "/createleader",
  [middlewares.verifyToken, middlewares.isManager],
  user.createLeader
);

router.post(
  "/createstaff",
  [middlewares.verifyToken, middlewares.isLeader],
  user.createStaff
);

router.put(
  "/updateleader",
  [middlewares.verifyToken, middlewares.isManager],
  user.updateLeader
);

router.get(
  "/getallleader",
  [middlewares.verifyToken, middlewares.isManager],
  user.getAllLeader
);

router.delete(
  "/deleteleader",
  [middlewares.verifyToken, middlewares.isManager],
  user.deleteLeader
);

module.exports = router;
