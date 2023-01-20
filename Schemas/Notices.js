const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const NoticeSchema  = new mongoose.Schema({
 role:{
    type:String,
 },
 title: { type:String },
 message:{type:String},
 id:String
});



const Notice = mongoose.model("infopublishers.notices", NoticeSchema);
exports.Notice = Notice