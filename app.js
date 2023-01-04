const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const tourRoutes = require("./routes/v1/tour.route");

// middleware
app.use(express.json());
app.use(cors());


// all route will be here
app.use('/api/v1/tour', tourRoutes);


// initial api
app.get("/", (req, res)=>{
    res.send("Congratulation! Everything is okay.")
})

module.exports = app;