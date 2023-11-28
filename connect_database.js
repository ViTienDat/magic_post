const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("magic_post", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connecttionDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connecttionDatabase();
