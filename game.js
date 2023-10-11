const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Hyper Transfer Markup Language",
        choice2: "Hyper Text Makeup Language",
        choice3: "Hyperlink and Text Markup Language",
        choice4: "Hyper Text Markup Language",
        answer: 4
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        choice1: "font-color",
        choice2: "color",
        choice3: "text-color",
        choice4: "text-style",
        answer: 2
    },
    {
        question: "Which HTML tag is used to include external JavaScript code in an HTML document?",
        choice1: "<script>",
        choice2: "<js>",
        choice3: "<javascript>",
        choice4: "<code>",
        answer: 1
    },
    {
        question: "What is the purpose of the 'document.getElementById()' method in JavaScript?",
        choice1: "To change the font size of an element",
        choice2: "To retrieve an HTML element by its ID",
        choice3: "To create a new HTML element",
        choice4: "To add a CSS class to an elemente",
        answer: 2
    },
    {
        question: " In HTML, which tag is used to create an ordered list?",
        choice1: "<li>",
        choice2: "<ul>",
        choice3: "<ol>",
        choice4: "<dl>",
        answer: 3
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter =0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS ){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html")
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    
    //update progress bar
    progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS) *100}%`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach( choice =>{
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        // const classToApply = 'incorrect';
        //     if(selectedAnswer == currentQuestion.answer) {
        //         classToApply = 'correct';
        //     };

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout ( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        //selectedChoice.parentElement.classList.remove(classToApply);

        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};


startGame();
