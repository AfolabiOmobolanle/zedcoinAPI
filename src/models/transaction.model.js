import { DataTypes } from "sequelize";
import sequelize from "../../database/db.js";
import User from "./user.model.js";

const Transaction = sequelize.define("Transaction", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  },
  type: {
    type: DataTypes.ENUM('deposit', 'withdrawal', 'gain', 'cashback', 'bonus'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.ENUM("BTC", "USDT"),
    allowNull: false,
  },
},{

  
        timestamps: true,
        freezeTableName: true,
        paranoid: true,
        underscored: true,
    
});

Transaction.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Transaction, { foreignKey: "user_id" });

export default Transaction;
