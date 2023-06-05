const express = require("express");
const router = express.Router();
const URL =  require("../models/url.js")
const Url = require('../models/url'); // Replace the path and filename with the correct location of your `Url` model

// Rest of your code


// router.get("/" , async (req,res)=>{
//     const allurls = await URL.find({})
//     return res.render("home",{
//     urls:allurls,
// })
// })

// module.exports = router;
// router.get("/", async (req, res) => {
//     try {
//       const allUrls = await URL.find({});
//       return res.render("home", {
     
//           urls: allUrls,
        
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send("Internal Server Error");
//     }
//   });
  
router.get('/', async (req, res) => {
    try {
      const urls = await Url.find();
    //   res.render('home', { urls }); // Pass the urls variable to the view
      res.render('home', { urls: urls }); // Assuming your variable containing the URLs is named `urls`

    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  

  module.exports = router;