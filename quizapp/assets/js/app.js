const questions = [{
    question: 'Which language is used to develop AI?',
    answers: [{
        text: 'Python',
        correct: true,
    },
    {
        text: 'JavaScript',
        correct: false,
    },
    {
        text: 'C++',
        correct: false,
    },
    {
        text: 'Kotlin',
        correct: false,
    }]
}, {
    question: 'Used to develop software?',
    answers: [{
        text: 'JavaScript',
        correct: false,
    },
    {
        text: 'C++',
        correct: true,
    },
    {
        text: 'Python',
        correct: false,
    },
    {
        text: 'Kotlin',
        correct: false,
    }]
}];

const questionElement = document.getElementById("quiz");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");
let correctAudio = new Audio('assets/sound/correct.mp3');
let errorAudio = new Audio('assets/sound/error.mp3');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    questionElement.style = 'block';
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
        button.classList.add("button")
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    // console.log(isCorrect);

    if (isCorrect) {
        selectBtn.classList.add('correct');
        correctAudio.play();
        score++;
    } else {
        selectBtn.classList.add('incorrect');
        errorAudio.play();
        window.navigator.vibrate(200);
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
            // console.log(button.dataset.correct);
            // score++;
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
    // answerButton.style.display = 'none';
}

function showScore() {
    resetState();
    let persentage = (100 / questions.length) * score;
    questionElement.innerHTML = `Persentage: ${Math.round(persentage)}%<br>Questions: ${questions.length} Score: ${score}!`;
    nextButton.style.display = 'block';
    nextButton.innerHTML = 'Try again';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();