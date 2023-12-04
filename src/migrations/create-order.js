"ponit strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      sender_name: {
        type: Sequelize.STRING,
      },
      receiver_name: {
        type: Sequelize.STRING,
      },
      sender_address: {
        type: Sequelize.STRING,
      },
      receiver_address: {
        type: Sequelize.STRING,
      },
      sender_phone: {
        type: Sequelize.STRING,
      },
      receiver_phone: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "dang giao",
      },
      price: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
