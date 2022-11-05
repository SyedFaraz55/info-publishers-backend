const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
 id:{
    type:String
 },
 classes:[{name:{type:String}}],
 date: { type: Date, default: Date.now },
});



const Class = mongoose.model("infopublishers.class", ClassSchema);
exports.Class = Class