const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: { type: String },
    fatherName: { type: String },
    dob: { type: String },
    pin: { type: String },
    school: { type: String },
    standard: { type: String },
    mobile: { type: String },
    email: { type: String },
    password: { type: String },
    active: {
        type: Boolean,
        default: false
    },
    id:String,
    role:{
        type:String,
        default:3
    }
});
StudentSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
    return token;
  };


const Student = mongoose.model("infopublishers.students", StudentSchema);
exports.Student = Student