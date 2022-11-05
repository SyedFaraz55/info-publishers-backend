const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
 id:{
    type:String
 },
 subjects:[{name:{type:String}}],
 date: { type: Date, default: Date.now },
});



const Subject = mongoose.model("infopublishers.subjects", SubjectSchema);
exports.Subject = Subject