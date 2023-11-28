const userRouter = require("./user");
const pointRouter = require("./point");

const initRoute = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/point", pointRouter);
};

module.exports = initRoute;
