var express = require("express"); 
var app = express(); 
//hi msg on "/"
app.get("/", function(req, res){
    res.render("smart_city.ejs"); 
})


//listening for a responce
//process.env.PORT only for C9
app.listen(process.env.PORT, process.env.IP , function(){console.log("server started")}); 