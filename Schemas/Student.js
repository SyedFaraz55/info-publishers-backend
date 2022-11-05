const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
 name:{type:String},
 fatherName:{type:String},
 dob:{type:String},
 pin:{type:String},
 school:{type:String},
 standard:{type:String},
 mobile:{type:String},
 email:{type:String},
 password:{type:String}
});



const Student = mongoose.model("infopublishers.students", StudentSchema);
exports.Student = Student