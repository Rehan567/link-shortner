const express = require("express");
const {newshortURL , handlegetanalytics} = require("../controllers/controllers.js")
const router = express.Router();

router.post("/" , newshortURL);

router.get('/analytics/:shortId', handlegetanalytics)

module.exports = router;