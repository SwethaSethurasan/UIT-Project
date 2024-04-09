const mysql=require("mysql");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true}));
app.use("/assets",express.static("assets"));
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"uiproject"
});
connection.connect(function(error){
    if(error) throw error
    else console.log("connected to database");
    
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index3.html");

})
app.post("/index3.html",function(req,res){
    console.log("Request body:", req.body);
    var username=req.body.username;
    var phone_number=req.body.phone_number;
    var otp=req.body.otp;
var sql="insert into users (username,phone_number) values (?,?)";
connection.query(sql,[username,phone_number],function(error,results){
    if (error) {
        console.log("Error inserting data:", error);
        res.status(500).send("Error");
    } else {
        console.log("Data inserted successfully");
        //res.status(200).send("Data inserted");
        res.redirect("/assets/cart.html");
    }
});
});
    

app.get("/",function(req,res){
    res.sendFile(__dirname + "/cart.html");
})
app.listen(4500);