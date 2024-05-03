const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Products = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },  
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },  
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  },
  {
    tableName: "products",
    timestamps: false,
  }
);


module.exports = Products;
