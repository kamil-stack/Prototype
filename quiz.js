const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: true })); 
router.use( (req,res,next) => {
    console.log('Requested URI Path : ', req.url)
    next() 
});


router.get('/CreateQuiz', (req,res) => {
    res.sendFile(__dirname + '/views/cq.html');
})

router.post('/Create', (req, res)=>{
    var code = req.body.quiz_code;
    var quiz_name = req.body.quiz_name;
    var noq = req.body.noq;
    if (code.length == 0){
        var code = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
    }
    res.send(`Quiz Name: ${quiz_name}<br>Quiz Code: ${code}<br>Number Of Questions: ${noq}`);
    console.log(`Quiz Name: ${quiz_name}\nQuiz Code: ${code}\nNumber Of Questions: ${noq}`)
    app.get('/part2'), (req,res) => {
        for (var _; _ < noq; _++){
            res.send(`Question ${_}`)
            res.send(`<label for="q${_}">Quiz Name:</label><input id="q${_}" type="text" name="q${_}">`)
        }
       
    }
})



var question_number = ['1','2']
var quiz_question = ["What Is The Colour Of The Sky?","What Is The Capital Of England?"];
var choice = [['Blue', 'Red','Green','Pink'],['Moscow','Paris','London','Berlin']];
var answer = ['Blue','London'];
var cq = 1;
var correct = 0;

router.get('/play', (req, res)=>{
    if (cq > 2){
        res.send(`Hello, You Got ${correct}/${cq-1}`)
        res.end()
    }else{
        res.render(__dirname + '/views/quiz', {cq,quiz_question, choice});
        console.log(cq);
}});

router.post('/play', (req, res) => {
    if (req.body.box == answer[cq-1]){
        cq++;
        correct++;
        res.redirect('play') 
    } else{
        cq++;
        res.redirect('play') 
    }
})



module.exports = router