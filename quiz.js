const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: true })); 
/*router.use( (req,res,next) => {
    console.log('Requested URI Path : ', req.url, req.params)
    next() 
});
*/

router.get('/CreateQuiz', (req,res) => {
    res.sendFile(__dirname + '/views/cq.html');
})

let play = (req, res) => {
    res.redirect(200,'play');
}


let createquiz = (req, res,) => {
    var code = req.body.quiz_code;
    var _ = 0;
    var quiz_name = req.body.quiz_name;
    var noq = req.body.noq;
    if (code.length == 0){
        var code = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
    }
    res.setHeader('Content-Type', 'text/html');
    res.write(`Quiz Name: ${quiz_name}<br>Quiz Code: ${code}<br><br><br>`)
    res.write('<form action="/part2" method="post">')
    for (var _; _ < noq; _++){
        res.write(`Question ${(_ + 1)}:`);
        res.write(`<br><label for="q${_}">Question: </label><input id="q${_}" type="text" name="q${_}"><br><label for="answer${_}">Answer:  </label><input id="answer${_}" type="text" name="answer${_}"><br><label for="choices${_}">Choices: </label><input id="choices${_}" type="text" name="choices${_}"><br><br>`)
    }
    res.write('<input value="Create" type="submit"></form>')
    res.end()
    console.log(`Quiz Name: ${quiz_name}\nQuiz Code: ${code}\nNumber Of Questions: ${noq}`)
   
    router.post('/part2', (req,res)=>{
        var question_number = [];
        var answer = [];
        var choice = [];
        var d;
        choice.length = noq; 
        for (d = 0; d < noq; d++){
            eval("var question"+d+" = {question: req.body.q"+d+", answer: req.body.answer"+d+" }");
            eval("var c = req.body.choices"+d+".split(',')");
            //var e = c.split(",");
            eval("question"+d+".choices = c");
        }
        res.end()
        var cq = 0;
        console.log(question0)
        console.log(question1)

    })
}

router.post('/CreateQuiz', createquiz);

// test quiz data
let question_number = ['1','2']
let quiz_question = ["What Is The Colour Of The Sky?","What Is The Capital Of England?"];
let choice = [['Blue', 'Red','Green','Pink'],['Moscow','Paris','London','Berlin']];
let answer = ['Blue','London'];
global.cq = 1;
global.correct = 0;


router.get('/play', (req, res)=>{
    if (cq > 2){
        res.send(`Hello, You Got ${correct}/${cq-1}<br><form action="/reset" method="post"><input type="submit" value="Reset"></form>`)
        res.end()
    }else{
        res.render(__dirname + '/views/quiz', {cq,quiz_question, choice});
        console.log(cq);
    }
});

router.post('/reset', (req,res) =>{
    global.cq = 1;
    global.correct = 0;
    console.log("gg")
    res.redirect("/play")    
})

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
