const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
id:String,
name:String,
questions:[{}],
series:String,
subject:String
});



const Exam = mongoose.model("infopublishers.exam", ExamSchema);
exports.Exam=Exam