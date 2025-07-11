const questions = [
    {
        question: "Does your child have difficulty reading unfamiliar words and often guesses at them?",
        answers: [
                {text: "Yes", correct:true},
                {text: "No", correct:false},
        ]
    },
    {
        question: "Does your child pause, repeat, or make frequent mistakes when reading out loud?",
        answers: [
                {text: "Yes", correct:true},
                {text: "No", correct:false},
        ]
    },
    {
        question: "Does your child mispronounce certain words (e.g., says amunul for animal, poothtaste for toothpaste)?",
        answers: [
                {text: "Yes", correct:true},
                {text: "No", correct:false},
        ]
    },
    {
        question: "Does your child struggle to understand what they have to read?",
        answers: [
                {text: "Yes", correct:true},
                {text: "No", correct:false},
        ]
    },
    {
        question: "Does your child not enjoy reading for fun?",
        answers: [
                {text: "Yes", correct:true},
                {text: "No", correct:false},
        ]
    },
    {
        question: "Does your child make frequent spelling errors?",
        answers: [
                {text: "Yes", correct:true},
                {text: "No", correct:false},
        ] 
    },
    {
        question: "Does your child have messy handwriting?",
        answers: [
                {text: "Yes", correct:true},
                {text: "No", correct:false},
        ]
    },
    {
        question: "Does your child have trouble with pronunciation and capitalization?",
        answers: [
                {text: "Yes", correct:true},
                {text: "No", correct:false},
        ]
    },
    {
        question: "Does your child resist writing tasks?",
        answers: [
                {text: "Yes", correct:true},
                {text: "No", correct:false},
        ]
    },
    {
        question: "Does your child become frustrated or angry when doing school work?",
        answers: [
                {text: "Yes", correct:true},
                {text: "No", correct:false},
        ]
    },
    {
        question: "Does your child have a blood relative with a history of reading, spelling or writing problems?",
        answers: [
                {text: "Yes", correct:true},
                {text: "No", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    nextButton.style.display = "none";
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    if (score >6) {
        const redirectButton = document.createElement("button");
        redirectButton.classList.add("next-btn");
        redirectButton.innerHTML = "Next";
        redirectButton.style.backgroundColor = "#A4747F";
        redirectButton.style.color = "#fff";
        redirectButton.style.fontWeight = "500";
        redirectButton.style.width = "200px";
        redirectButton.style.border = "0";
        redirectButton.style.padding = "10px";
        redirectButton.style.margin = "20px auto 0";
        redirectButton.style.borderRadius = "4px";
        redirectButton.style.cursor = "pointer";
        redirectButton.style.display = "block";
        redirectButton.onclick = redirectToanotherPage;
    
        answerButtons.appendChild(redirectButton);
    }

    // Modify the nextButton for retaking the quiz
    nextButton.innerHTML = "Take the Quiz Again";
    nextButton.style.display = "block";
    nextButton.onclick = startQuiz;

}


function redirectToanotherPage(){
    const redirectButton = document.createElement("button");
    window.location.href="../flipme/index.html";
    redirectButton.classList.add("next-btn");
    redirectButton.innerHTML="Next";
    redirectButton.style.display = "block";
    
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz(); 