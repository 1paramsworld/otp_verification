const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const hbs = require("hbs");

const templatepath = path.join(__dirname, "../templates");
app.set("view engine", "hbs");
app.set("views", templatepath);
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("email");
});

app.get("/enterotp", (req, res) => {
    res.render("otp");
});


var num = Math.floor(Math.random() * 900000) + 100000;
app.post("/login",(req,res)=>{
    const email=req.body.useremail;
     const url = "mongodb://0.0.0.0:27017"; 
     const client=new MongoClient(url);

     client.connect().then(()=>{
        const dbname=client.db("paramshah");
        const collection=dbname.collection("paramdata");
        return collection.findOne({email:email})
     }).then((data)=>{
        if(data.length!==0){
            res.render("otp")
        }
 }).then(()=>{

    const nodemailer = require('nodemailer');


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'param270604@gmail.com',
            pass: 'sqyi ffjd ivqf qrwl'
        }
    });

    const mailOptions = {
        from: 'param270604@gmail.com',
        to: req.body.useremail,
        subject: 'Hello from almost vsco',
        text: `welcome to almost vsco.your otp is ${num}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });


 })
})

app.post("/getotp",(req,res)=>{
    const userotp=req.body.userotp;

    if(userotp==num){
        res.render("home")
    }
    else{
    res.end("wrong otp");
    }

})
app.listen(3000)

//C:\Users\SANJAY\Downloads\ngrok-v3-stable-windows-amd64 (1)