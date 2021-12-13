const express = require("express");
const bodyParser = require("body-parser");
const db = require("./api/models");
const path=require("path");

const userRoutes = require("./api/routes/user");
const productRoutes = require("./api/routes/tipManager");

//connect Database
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

const app = express();

//image upload
app.use("/profile_picture", express.static(path.join("public/user")));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

module.exports = app;
