const router = require("express").Router();
const user = require("../controllers/user");
const middlewares = require("../middlewares/verifyToken");

router.post("/createuser", user.createUser);
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

//get leader nhớ truyền params là id
router.get(
  "/getleader/:uid",
  [middlewares.verifyToken, middlewares.isManager],
  user.getLeader
);

// xoa leader
router.delete(
  "/deleteleader/:uid",
  [middlewares.verifyToken, middlewares.isManager],
  user.deleteLeader
);

module.exports = router;
