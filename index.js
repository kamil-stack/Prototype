/* 
Modules {
    express: Web Framework
    ejs: Embedded Javascript(Make Site Dynamic)
}*/
const express = require('express');
const fs = require('fs');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const ejs = require('ejs');
var port = 3333; // Port 3333 for testing cause linux needs root for ports like 80
var quiz = [];



const Quiz = require('./quiz') 
app.use(Quiz);

mongoose.connect(process.env.QUIZDB, { useUnifiedTopology: true,useNewUrlParser: true})
const quizdb = mongoose.connection;

quizdb.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });


app.set('views', './views')
app.set('view engine', 'ejs') // Used for generating dynamic sites

// Static
app.use(express.static('public')) // Allowing Access To Files In Public Folder
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/login', (req,res) => {
    res.sendFile(__dirname + '/views/login.html');
})
app.get('/register', (req,res) => {
    if (req.query.status == "error"){
        res.write("Error Try Again")
        res.sendFile(__dirname + '/views/register.html');
    }else{
        res.sendFile(__dirname + '/views/register.html');
    }
})


app.post('/register', (req, res) => {
    fs.readFile('./users.txt', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
        res.send("Error Retry")
    }
    if (data.indexOf(((req.body.username).toUpperCase())+":") !== -1){
        res.redirect('/register/status?=error')
    }else{
        fs.appendFileSync('./users.txt', ("\n"+((req.body.username).toUpperCase())+":"+req.body.password));
        res.redirect("/play/?user=" + req.body.username)
    }
    })
});

app.post('/login', (req, res) => {
    fs.readFile('./users.txt', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    if (data.indexOf((req.body.username).toUpperCase()+":"+req.body.password) !== -1){
        console.log("welcome",req.body.username)
        global.user = req.body.username;
        res.redirect("/play/?user=" + req.body.username)
    }else{
        res.write("Incorrect Login")
    }
    })
});




//app.use((req, res) => {
//    res.sendFile(__dirname + '/views/test.html');
//})

app.listen(port, console.log(`[App] Running On Port ${port}`)); 

