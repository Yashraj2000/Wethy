var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var flash = require("connect-flash");
// var popupS = require('popups');


// var jsalert = require("js-alert")
// var popupS = require('popups');
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(flash());

app.use(require("express-session")({
    secret:"This can be anything",
    resave:false,
    saveUninitialized:false
}))
app.use(function(req,res,next){
    res.locals.err = req.flash("error");
    next();
})
app.get("/",(req,res)=>{
    res.render("weather");
})



app.get("/weather",(req,res)=>{
    var city = req.query.weather;
    request("http://api.weatherapi.com/v1/forecast.json?&key=06e18e231f7e469e8c7213406200306&q="+ city,(err,response,body)=>{
        if(!err && response.statusCode==200)
        {  
            //  console.log(err)
            var weatherdata = JSON.parse(body);
            console.log(weatherdata)
            // console.log(err.length)
            // console.log(weatherdata.forecast.forecastday[0])
            console.log(response.statusCode)
            res.render("weather",{weatherdata:weatherdata})
        }
        else 
        {   console.log("yaha aaya")
            console.log(err)

            req.flash("error","Please Enter a valid location");
            // console.log(err);
            res.redirect("/")
        }
    })
})











// <!-- <% if(typeof weatherdata != 'undefined'){ %>
//     <!-- <img src=" <%= weatherdata.current.condition.icon %> " alt="Weather image" class="responsive-img"> -->
//     <!-- <p>Weather information:<%= weatherdata.current.condition.text %></p> -->
//     <!-- <p><%= weatherdata.location.localtime %></p> -->
//     <!-- <p>last Updated at:<%= weatherdata.current.last_updated %></p> -->
//     <!-- <p>Temperature in c:<%= weatherdata.current.temp_c%></p> -->
//     <!-- <p>Wind Speed:<%= weatherdata.current.wind_kph%>kmph</p>
//     <p>humidity%:<%= weatherdata.current.humidity%></p>
//     <p>maximum tem:<%= weatherdata.forecast.forecastday[0].day.maxtemp_c%></p>
//     <p>minimum tem:<%= weatherdata.forecast.forecastday[0].day.mintemp_c%></p>
//     <p>Average tem:<%= weatherdata.forecast.forecastday[0].day.avgtemp_c%></p>
//     <p>sun rise:<%= weatherdata.forecast.forecastday[0].astro.sunrise%></p>
//     <p>sun set:<%= weatherdata.forecast.forecastday[0].astro.sunset%></p>
//     <%  } %>  -->      
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, function(){
    console.log(`listening on port ${port}`)
});