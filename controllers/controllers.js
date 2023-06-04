const  shortid  = require("shortid");
const URL = require("../models/url.js")

async function   newshortURL (req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "url is required"})
   const shortID = shortid(7);
   
   await URL.create({
    shortId : shortID,
    redirectURL : body.url,
    visitHistory : [],
   })

   return res.json({id : shortID})
}
async function handlegetanalytics(req, res) {
    const shortId = req.params.shortId;
  
    try {
      const result = await URL.findOne({ shortId });
  
      if (result) {
        if (Array.isArray(result.visitHistory)) {
          return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
          });
        } else {
          return res.json({
            totalClicks: 0,
            analytics: [],
          });
        }
      } else {
        return res.status(404).json({ error: 'Link not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  module.exports = {
    newshortURL,
    handlegetanalytics,
  };
  