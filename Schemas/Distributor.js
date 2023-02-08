const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const DistributorSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,

  },
  name: {
    type: String,
    required: true,
  },
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
  password:{
    type:String,
    required:true
  },
  username:{
    type:String,
  },
  school:Number,
  date: { type: Date, default: Date.now },
  role:{
    type:String,
    default:1
  },
  active:{
    type:Boolean,
    default:true
  }
});

const validateDistributor = (user) => {
    const schema = Joi.object({
      firstname: Joi.string().min(5).max(50).required(),
      lastname: Joi.string().min(5).max(255),
      town: Joi.string().max(255),
      code: Joi.string().min(4).max(255),
      additional: Joi.string().min(4).max(255),
      default: Joi.boolean(),
      email: Joi.string().min(5).max(255).required().email(),
      address: Joi.string().min(5).max(255).required(),
      mobile: Joi.string().min(5).max(10).required(),
      country: Joi.string().min(5).max(10).required(),
      city: Joi.string().min(5).max(10).required(),
      method: Joi.string().required(),
      order: Joi.array().required(),
    });
  
    return schema.validate(user);
  };
  DistributorSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
    return token;
  };



const Distributors = mongoose.model("infopublishers.distributors", DistributorSchema);
exports.Distributors = Distributors;