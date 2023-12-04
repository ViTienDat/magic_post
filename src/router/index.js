const userRouter = require("./user");
const pointRouter = require("./point");
const orderRouter = require("./order");

const initRoute = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/point", pointRouter);
};

module.exports = initRoute;
