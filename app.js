const express = require("express")
const path = require('path');
const urlRoute = require("./routes/routes.js");
const { connectToMongoDB } = require("./connect.js");
const URL = require('./models/url.js')
const staticRouter = require("./routes/staticRouter.js")


const app = express();
const PORT = 8000;


connectToMongoDB('mongodb+srv://rehanmohd042:ve4Km5TcucminqI0@rehan07.kst6pfo.mongodb.net/short-url')
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
console.log(error);
})



app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/url" , urlRoute)
app.use("/" , staticRouter)


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
  
    try {
      const entry = await URL.findOneAndUpdate(
        { shortId },
        {
          $push: {
            visitedHistory: {
              timestamp: Date.now()
            }
          }
        }
      );
  
      if (entry) {
        res.redirect(entry.redirectURL);
      } else {
        res.status(404).json({ error: 'Link not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(PORT , ()=>{
    console.log(`server started at ${PORT}`);
})