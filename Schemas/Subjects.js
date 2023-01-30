const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
 id:{
    type:String
 },
 subject:String,
 date: { type: Date, default: Date.now },
 active:{
   type:Boolean,
   default:false
 }
});



const Subject = mongoose.model("infopublishers.subjects", SubjectSchema);
exports.Subject = Subject