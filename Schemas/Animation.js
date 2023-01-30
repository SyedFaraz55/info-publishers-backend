const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const AnimationSchema = new mongoose.Schema({
id:String,
name:String,
link:String,
series:String,
class:String,
subject:String,

date:{type:Date,default:Date.now}
});



const Animation = mongoose.model("infopublishers.animation", AnimationSchema);
exports.Animation=Animation 