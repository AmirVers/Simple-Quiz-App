const quizData = [
    {
        question: 'Корень из 625?',
        answers: [
            {answer: '15', correct: false},
            {answer: '25', correct: true},
            {answer: '20', correct: false},
            {answer: '30', correct: false}
        ]
    },
    {
        question: 'Фамилия Даниала?',
        answers: [
            {answer: 'Сагатов', correct: false},
            {answer: 'Кудус', correct: false},
            {answer: 'Яппаров', correct: false},
            {answer: 'Шакаргалиев', correct: true}
        ]
    },
    {
        question: 'Решите квадратное уравнение: x² + 2x + 1 = 0',
        answers: [
            {answer: '-3', correct: false},
            {answer: '1', correct: false},
            {answer: '-1', correct: true},
            {answer: '3', correct: false}
        ]
    },
    {
        question: 'Продолжите фразу: 160 Фулл...',
        answers: [
            {answer: 'Пис, Фулл бокс', correct: true},
            {answer: 'Пис', correct: false},
            {answer: 'Бокс', correct: false},
            {answer: 'Хаус', correct: false}
        ]
    }
]

const nextButton = document.querySelector('.submit-button');
const question = document.querySelector('.question');
const container = document.querySelector('.container');
const answerEl = document.querySelector('.answer');


let currentQuizIndex = 0;
let score = 0;

function startQuiz() {
    currentQuizIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    loadQuiz();
}

startQuiz();

function loadQuiz() {
    resetPrev();
    const currentQuiz = quizData[currentQuizIndex];

    question.textContent = currentQuiz.question;

    currentQuiz.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = answer.answer;
        answerEl.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', loadCorrect)
    })
}

function loadCorrect(e) {
    const pressedBtn = e.target;
    const correctAnswer = pressedBtn.dataset.correct === 'true';

    if (correctAnswer){
        pressedBtn.classList.add('correct');
        score++
    } else {
        pressedBtn.classList.add('incorrect');
    }

    Array.from(answerEl.children).forEach(answerBtn => {
        if (answerBtn.dataset.correct){
            answerBtn.classList.add('correct');
        }
        answerBtn.disabled = true;
    })
    nextButton.style.display = 'block'
}

function resetPrev() {
    nextButton.style.display = 'none';
    while (answerEl.firstChild){
        answerEl.removeChild(answerEl.firstChild);
    }
}

function showScoreBoard() {
    resetPrev();
    question.innerHTML = 
    `
    <h2>Вы ответили правильно на ${score} из ${quizData.length}</h2><img class='img' src = 'congrats.jpg' alt = 'congratulations'> 
    `
    nextButton.textContent = 'Начать заново';
    nextButton.style.display = 'block'
}

function handleButton() {
    currentQuizIndex++
    if (currentQuizIndex < quizData.length){
        loadQuiz();
    } else {
        showScoreBoard();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuizIndex < quizData.length){
        handleButton();
    } else {
        startQuiz();
    }
})