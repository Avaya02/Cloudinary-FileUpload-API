const express = require("express");
const router = express.Router();

const{localFileUpload} = require('../controllers/fileUpload');
const{imageUpload,videoUpload} = require ('../controllers/fileUpload');


//define api routes

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload",videoUpload);

module.exports = router;
