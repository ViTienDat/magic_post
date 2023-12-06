const userRouter = require("./user");
const pointRouter = require("./point");
const orderRouter = require("./order");
const transportRouter = require("./treansport");

const initRoute = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/point", pointRouter);
  app.use("/api/transport", transportRouter);
};

module.exports = initRoute;
