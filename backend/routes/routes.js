const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const SK = "qwertyuiopasdfghjklzxcvbnmqwerty";
const Product = require("../db/models/products");
const { where } = require("sequelize");

//MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//ROUTES
// Create new Product
app.post("/product", async (req, res) => {
  try {
    const { name, desc, category } = req.body;
    await Product.create({
      name,
      desc,
      category
    });
    res.status(200).json({ code: "00", data:null, desc: "New product created" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ code: "01", data:null, desc: "Could not Add product" });
  }
});
//Find All Products
app.get("/showproducts", async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    res.status(200).json({code:"00",data: allProducts,desc:"All Products Loaded"});
  } catch (error) {
    console.error("Error Finding Products:", error);
    res.status(500).json({code:"01",data:null, desc: error.message });
  }
});
//Update product in table
app.put("/edit", async (req, res) => {
  try {
    const {id,form} = req.body;
    const pro = await Product.findOne({where: {id : id}});
    if (!pro) {
      return res.status(400).json({code:"02",data:null, desc : "Product not found"});
    }

    const updateproduct = await Product.update(
      {
        name : form.name,
        desc : form.desc,
        category: form.category
      },
      { where: { id : id } }
    );
    res.status(200).json({code:"00",data: updateproduct , desc:"Product Updated Successfully"});
  } catch (error) {
    console.error("Error Updating Product: ", error);
    res.status(500).json({code:"01",data:null, desc: error.message });
  }
});
//Delete product from table
app.post("/delete", async (req, res) => {
  try {
    const { name } = req.body;
    await Product.destroy({ where:{ name : name } });
    res.status(200).json({code:"00",data: null , desc:"Product Deleted Successfully"});
  } catch (error) {
    console.error("Error Deleting User: ", error);
    res.status(500).json({code:"01",data:null, desc: error.message });
  }
});

module.exports = app;
