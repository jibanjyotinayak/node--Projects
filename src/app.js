const path = require("path");
const express = require("express");
const hbs = require("hbs");
const reload = require('reload')
const res = require("express/lib/response");
const http = require('http');
const { query } = require("express");
const geocode= require('./utils/geocode')
const forecast= require ('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express();
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//telling express which template engine is used
//app.set('views', path.join(__dirname,'../public'))

//set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to change
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "jiban nayak",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Javascript Projects",
  });
});

app.get("/over", (req, res) => {
  res.render("over", {
    title: "Anish",
    age: 24,
    name: "jiban",
  });
});
//app.com
//app.com/help
//app.com/about
//app.get('',(req,res)=<{
//     res.send('welcome to the page')
// })
// app.get("/help", (req, res) => {
//   res.send("Help");
// });

// app.get("/about", (req, res) => {
//   res.send([
//     { name: "jiban", age: 24 },
//     { name: "rutu", age: 25 },
//   ]);
// });

// app.get("/weather", (req, res) => {
//   res.send({ forecast: "it is summer", location: "hyderabad" });
// });

app.get('/weather',(req,res)=>{

if (!req.query.address){
  return res.send({
    error :'U MUST PROVIDE AN ADDRESS'
  })
}
geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
if (error){
  return res.send({error})
}
forecast(latitude,longitude,(error,forecastData)=>{
  if (error){
    return res.send({error})
  }

res.send({
  forecast: forecastData,
  location,
  address:req.query.address
})


})

})


//  console.log(req.query.address)  
// res.send({
//     weather:'bHUBANESWAR',
//     temp:32 ,
//     address:req.query.address
//   })
})

app.get('/products',(req,res)=>{
  if (!req.query.search) {
    return res.send({
      error:'You must provide some a search term '
    })
  }

  console.log(req.query.search)
  res.send({
    products:['hello','bolo']
  })
})


app.get("/over/*", (req, res) => {
  res.render("404",{
    title:'404 ',
    name:'jiban nayak',
    errorMessage:'Help page not found'
  });
});

//route to get 404 error page (*:denotes as wild card character )

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Website Page  is not found",
  });
});

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });
//const server= http.createServer(app);
app.listen(port,()=>{ console.log('Server is UP running on port' + port )})

//reload(app);