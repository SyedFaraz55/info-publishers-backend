const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();


router.get("/",async(req,res)=> {
    return res.send(200);
})

module.exports = router