const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const SeriesSchema = new mongoose.Schema({
 name:{
    type:String,
 },
 date: { type: Date, default: Date.now },
});



const Series = mongoose.model("infopublishers.series", SeriesSchema);
exports.Series = Series