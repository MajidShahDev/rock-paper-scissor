let userScore = 0;
let compScore = 0;
let choices = document.querySelectorAll(".choices");
let msg = document.querySelector('#msg');
let userScorePara = document.querySelector('#user-score');
let compScorePara = document.querySelector('#comp-score');
let reset = document.querySelector('#reset');
let msgContainer = document.querySelector('.msg-container');

let winAud = new Audio('music/win.wav');
let loseAud = new Audio('music/lose.wav');
let drawAud = new Audio('music/draw.wav');
let resetAud = new Audio('music/reset.mp3');



const generateCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    let randomIndx = Math.floor(Math.random() * 3);
    return options[randomIndx];
};



const draw = () => {
    msg.innerHTML = `Game is draw!`;
    msgContainer.style.backgroundColor = 'hsl(150, 0%, 25%)';
    winAud.pause();
    loseAud.pause();
    drawAud.currentTime = 0;
    drawAud.play();
};



const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerHTML = userScore;
        msg.innerHTML = `You Win! your ${userChoice} beats comp ${compChoice}`;
        msgContainer.style.backgroundColor = 'hsl(130, 100%, 30%)';
        loseAud.pause();
        drawAud.pause();
        winAud.currentTime = 0;
        winAud.play();
    } else {
        compScore++;
        compScorePara.innerHTML = compScore;
        msg.innerHTML = `You Lose! comp ${compChoice} beats your ${userChoice}`;
        msgContainer.style.backgroundColor = 'hsl(0, 75%, 45%)';
        winAud.pause();
        drawAud.pause();
        loseAud.currentTime = 0;
        loseAud.play();
    }
}



const playGame = (userChoice) => {
    const compChoice = generateCompChoice();
    if (userChoice === compChoice) {
        draw();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === 'scissor' ? true : false;
            // scissor, paper 
        } else if (userChoice === "paper") {
            userWin = compChoice === 'rock' ? true : false;
            // rock, scissor
        } else if (userChoice === 'scissor') {
            userWin = compChoice === 'paper' ? true : false;
            // paper, rock
        }
        showWinner(userWin, userChoice, compChoice);
    }

};



choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});



reset.addEventListener('click', () => {
    userScorePara.innerHTML = userScore = 0;
    compScorePara.innerHTML = compScore = 0;
    resetAud.play();
})
