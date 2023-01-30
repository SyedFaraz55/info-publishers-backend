const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const YearPlanSchema= new mongoose.Schema({
title:String,
link:String
});



const YearPlan = mongoose.model("infopublishers.yearplan", YearPlanSchema);
exports.YearPlan = YearPlan