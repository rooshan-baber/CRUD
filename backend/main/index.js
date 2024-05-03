const express = require("express");
const cors = require("cors");
const routes = require("../routes/routes");
const sequelize = require("../db/config/config");
const Product = require('../db/models/products');

const PORT = 3000;
const app = express();
//MIDDLEWARES
app.use(cors());
app.use("/", routes);
// Database Configuration
sequelize
  .sync()
  .then(() => {
    console.log("Database Synced.");
  })
  .catch((err) => {
    console.log("Error Syncing Database\n error: ", err.message);
  });
// Table Creation in Synced Database

// Product.sync({alter:true}).then(() =>{
//   console.log("Product Table / Model added to the Synced Database.");
// }).catch((err) =>{
//   console.log("Product Table / Model couldn't be added to the Synced Database.\nerror: ",err.message);
// });


//SERVER
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
