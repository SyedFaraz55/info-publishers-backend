const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
 id:{
    type:String
 },
 subs:[{name:String,link:String}],
 date: { type: Date, default: Date.now },

 name:String
});



const Lessons = mongoose.model("infopublishers.lessons", LessonSchema);
exports.Lessons =Lessons 