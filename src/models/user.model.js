import { DataTypes } from "sequelize";
import sequelize from "../../database/db.js";
import bcrypt from "bcrypt";

const Users = sequelize.define("Users",
     {
    firstname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  btc_balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  usdt_balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  }

},

  {
        timestamps: true,
        freezeTableName: true,
        // paranoid: true,
        underscored: true,
    });



export default Users;
