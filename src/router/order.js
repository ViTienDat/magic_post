const router = require("express").Router();
const order = require("../controllers/order");
const middlewares = require("../middlewares/verifyToken");

router.post(
  "/",
  [middlewares.verifyToken, middlewares.isStaff],
  order.createOrder
);

router.delete(
  "/:oid",
  [middlewares.verifyToken, middlewares.isStaff],
  order.deleteOrder
);

router.get(
  "/getorderdetails/:oid",
  [middlewares.verifyToken, middlewares.isStaff],
  order.getOrderDetail
);

router.get("/orderbyuser", middlewares.verifyToken, order.getOrderByUser);

router.get(
  "/getallorder",
  [middlewares.verifyToken, middlewares.isStaff],
  order.getAllOrder
);

router.put(
  "/completedorder/:id",
  [middlewares.verifyToken, middlewares.isStaff],
  order.completedOrder
);

router.put(
  "/wrongorder",
  [middlewares.verifyToken, middlewares.isStaff],
  order.wrongOrder
);

module.exports = router;
