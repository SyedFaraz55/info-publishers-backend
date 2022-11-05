const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
 id:{
    type:String
 },
 lessons:[{name:{type:String},sub:{type:Boolean},label:{type:String},subs:[{name:{type:String}}]}],
 date: { type: Date, default: Date.now },
});



const Lessons = mongoose.model("infopublishers.lessons", LessonSchema);
exports.Lessons =Lessons 