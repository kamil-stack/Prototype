const mongoose = require('mongoose'); 

var QuizSchema = new mongoose.Schema(
    {
        id: Number,
        question: String,
        choices: Array,
        answer: Array
})
var quiz = new mongoose.Schema(
    {
        id: Number,
        code: String,
        hosted: Date.now()
})

module.exports = new mongoose.model('questions', QuizSchema); 
module.exports = new mongoose.model('quiz', quiz); 
