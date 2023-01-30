const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
id:String,
name:String,
questions:[{}],
series:String,
subject:String
});



const Assessment = mongoose.model("infopublishers.assessment", AssessmentSchema);
exports.Assessment=Assessment