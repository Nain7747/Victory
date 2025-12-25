const quizData = [
    {
        question: "Сколько планет в Солнечной системе?",
        options: ["7", "8", "9", "10"],
        correct: 1
    },
    {
        question: "Столица Франции?",
        options: ["Лондон", "Берлин", "Париж", "Мадрид"],
        correct: 2
    },
    {
        question: "Самое глубокое озеро в мире?",
        options: ["Виктория", "Байкал", "Танганьика", "Верхнее"],
        correct: 1
    },
    {
        question: "Кто написал 'Войну и мир'?",
        options: ["Достоевский", "Толстой", "Чехов", "Гоголь"],
        correct: 1
    },
    {
        question: "Сколько цветов у радуги?",
        options: ["5", "6", "7", "8"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const scoreEl = document.getElementById('score');
const maxScoreEl = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');

totalQuestionsEl.textContent = quizData.length;
maxScoreEl.textContent = quizData.length;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionEl.textContent = currentQuestion + 1;
    
    optionsContainer.innerHTML = '';
    nextBtn.classList.add('hidden');
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        
        // Если у нас уже есть ответ на этот вопрос, показываем его
        if (userAnswers[currentQuestion] !== undefined) {
            if (userAnswers[currentQuestion] === index) {
                button.classList.add('selected');
                if (index === question.correct) {
                    button.style.backgroundColor = '#4CAF50';
                } else {
                    button.style.backgroundColor = '#F44336';
                }
            }
            if (index === question.correct) {
                button.style.backgroundColor = '#4CAF50';
            }
        }
        
        optionsContainer.appendChild(button);
    });
    
    // Если ответ уже выбран, показываем кнопку "Далее"
    if (userAnswers[currentQuestion] !== undefined) {
        nextBtn.classList.remove('hidden');
    }
}

function selectOption(selectedIndex) {
    userAnswers[currentQuestion] = selectedIndex;
    
    const question = quizData[currentQuestion];
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach((button, index) => {
        button.classList.remove('selected');
        
        if (index === selectedIndex) {
            button.classList.add('selected');
            if (index === question.correct) {
                button.style.backgroundColor = '#4CAF50';
            } else {
                button.style.backgroundColor = '#F44336';
                // Показываем правильный ответ
                buttons[question.correct].style.backgroundColor = '#4CAF50';
            }
        } else if (index === question.correct) {
            button.style.backgroundColor = '#4CAF50';
        }
        
        button.disabled = true;
    });
    
    // Добавляем очки, если ответ правильный
    if (selectedIndex === question.correct) {
        score++;
    }
    
    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    scoreEl.textContent = score;
    
    // Показываем сообщение в зависимости от результата
    const percentage = (score / quizData.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Потрясающе! Идеальный результат! 🎉";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Отлично! Хорошие знания! 👍";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Хорошо! Есть что повторить! 😊";
    } else {
        resultMessage.textContent = "Попробуйте еще раз, вы сможете лучше! 💪";
    }
}

function restartQuiz() {
    startQuiz();
}

// Инициализация при загрузке
window.addEventListener('DOMContentLoaded', () => {
    console.log('Викторина загружена и готова!');
});