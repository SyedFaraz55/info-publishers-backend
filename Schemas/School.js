const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  distId: {
    type: String,
  },
  schoolId: {
    type: String,
  },
  name: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
  email:{type:String},
  mobile:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  district:{
    type:String,
    required:true
  },
  pincode:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  username:String,

  password:{
    type:String,
    required:true
  },
  noClasses:{type:Number},
  classes:[{name:{type:String},series:{type:String}}],
  date: { type: Date, default: Date.now },
  role:{
    type:String,
    default:2
  },
  pending:{type:Boolean,default:true},
  active:{
    type:Boolean,
    default:true
  }
});

SchoolSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
    return token;
  };


const School = mongoose.model("infopublishers.school", SchoolSchema);
exports.School = School;