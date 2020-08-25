# Prototype
Modules Being Used: express, mongoose, ejs, dotenv, body-parser


Model For Quiz Question:
```
{
    id: Number,
    question: Array,
    choices: Array,
    answer: Array
}
```
ID will be used for identifying which quiz this is. Questions is an arrary to hold multiple questions, choices is also an array which will be 2D, answer will be a regular array to hold the answer for the questions.



## Quiz Creation
There are two stages to Quiz Creation.

First Stage:
- Quiz Name
- Quiz Code
- Number Of Questions

Second Stage:
- Question
- Choices To Questions
- Answer To Question


## User Handling
Guests Are allowed to particpate in a quiz however they're not able to create a quiz. (Will Be implemented Later)
