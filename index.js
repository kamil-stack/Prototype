/* 
Modules {
    express: Web Framework
    ejs: Embedded Javascript(Make Site Dynamic)
}*/
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const ejs = require('ejs');
var port = 3333; // Port 3333 for testing cause linux needs root for ports like 80
var quiz = [];

const secret = "fdsgjnsdgsdg!3rfr2ef2"

const Quiz = require('./quiz') 
app.use('/quiz/', Quiz) 

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
app.post('/login', (req, res) => {
    res.send("Not Ready")
});




//app.use((req, res) => {
//    res.sendFile(__dirname + '/views/test.html');
//})

app.listen(port, console.log(`[App] Running On Port ${port}`)); 

