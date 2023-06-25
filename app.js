const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
           res.sendFile(__dirname+"/index.html")         
                    
})
app.post("/",function(req,res){
              const query=req.body.cityName;
              const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=d32cc0d68d419deedc98b357396be39f&units=metric"
              https.get(url,function(response){
                    response.on("data",function(data){
                                        const weatherData=JSON.parse(data);
                                        const temp=weatherData.main.temp;
                                        const weatherDes=weatherData.weather[0].description;
                                        const icon=weatherData.weather[0].icon;
                                        const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
                                        res.write("<h1>The temperature of "+ query+" is "+temp+" degree celsius</h1>")
                                        res.write("<h1>The weather description is "+weatherDes+"</h1>")
                                        res.write("<img src="+imgurl+">");
                                        res.send();
                    })
              })      
})
app.listen(3000,function(){
                    console.log("Server live at channel 3000");
})