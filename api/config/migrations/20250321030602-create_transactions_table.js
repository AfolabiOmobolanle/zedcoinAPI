export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Transactions", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
    type:Sequelize.ENUM('deposit', 'withdrawal', 'gain', 'cashback', 'bonus'),
        allowNull: false,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      currency: {
        type: Sequelize.ENUM("BTC", "USDT"),
        allowNull: false,
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
    await queryInterface.dropTable("Transactions");
  },
};
