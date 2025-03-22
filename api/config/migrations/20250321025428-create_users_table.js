export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
        firstname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      btc_balance: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      usdt_balance: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
   
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
