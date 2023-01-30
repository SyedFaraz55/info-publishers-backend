const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const TeachingSchema = new mongoose.Schema({
id:String,
series:String,
class:String,
subject:String,
name:String,
link:String,
 date: { type: Date, default: Date.now },
});



const Teaching = mongoose.model("infopublishers.teaching", TeachingSchema);
exports.Teaching=Teaching 