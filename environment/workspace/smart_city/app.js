var express = require("express"); 
var app = express(); 
//getting the public folder
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("smart_city.ejs"); 
})


//listening for a responce
//process.env.PORT only for C9
app.listen(process.env.PORT, process.env.IP , function(){console.log("server started")}); 