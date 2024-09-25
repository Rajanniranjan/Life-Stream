const express = require("express");
const { testController } = require("../controllers/testController");

//router object
const router = express.Router();

//routes
// test route create 
router.get("/", testController);

//export
module.exports = router;
