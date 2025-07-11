const cards = document.querySelectorAll(".card");
var flippedCards = document.querySelectorAll(".flip");

var isFlipped = false;
var firstCard;
var secondCard;
var timeOut;
var highScore = 0;

let chancesLeft = 10;
let points = 0;

function flip(){
    this.classList.add("flip");
    this.removeEventListener("click", flip)
    if(!isFlipped){
        isFlipped = true;
        firstCard = this;
        console.log("FirstCard : ",this);
    }
    else{
        secondCard = this;
        console.log("SecondCard : ",this);
        checkMatch();
    }
    flippedCards = document.querySelectorAll(".flip");
    if(flippedCards.length === 16){
        gameOver();
    }
}

function checkMatch(){
    (firstCard.dataset.image === secondCard.dataset.image) ? success() : fail();
}

function success(){
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip);
    points++;
    document.getElementById("points").innerText = points;
    reset();
}

function fail(){
    cards.forEach((card) => card.removeEventListener("click", flip));
    chancesLeft--;
    document.getElementById("chancesLeft").innerText = chancesLeft;
    timeOut = setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        reset();
        cards.forEach((card) => card.addEventListener("click", flip));
    }, 1000);
    if(chancesLeft === 0){
        gameOver();
    }
}

function reset(){
    isFlipped = false;
    firstCard = null;
    secondCard = null;
}

function gameOver(){
    clearTimeout(timeOut);
    cards.forEach((card) => card.removeEventListener("click", flip));
    if(points > localStorage.getItem("highScore")){
        localStorage.setItem("highScore",points);
        document.getElementById("game-over-text").innerText = "New High Score !! Game Over";
    }
    else{
        document.getElementById("game-over-text").innerText = "Game Over !";
    }
    console.log("HighScore after Game Ends : ", localStorage.getItem("highScore"));
    document.getElementById("gameOver").style.display = "block";
}

function shuffleOnStart(){
    cards.forEach((card) => card.addEventListener('click', flip));
    console.log("Hello on startUp");
    highScore = localStorage.getItem("highScore") == null ? 0 : localStorage.getItem("highScore");
    console.log("HighScore before Game Starts : ", localStorage.getItem("highScore"));
    document.getElementById("highScore").innerText = highScore;
    console.log("Chances Left : ", chancesLeft);
    document.getElementById("chancesLeft").innerText = chancesLeft;
    console.log("Points : ", points);
    document.getElementById("points").innerText = points;
    cards.forEach((card) => {
        var index = Math.floor(Math.random() * 16);
        card.style.order = index;
    });
}

function playAgain(){
    reset();
    cards.forEach((card) => {
        card.classList.remove("flip");
    });
    points = 0;
    chancesLeft = 10;
    document.getElementById("gameOver").style.display = "none";
    shuffleOnStart();
}

(function loader(){
    console.log("Executing Loader..");
    setTimeout(() => {
        console.log("After 2 sec..");
        document.getElementById("loader").style.display = "none";
        document.getElementById("loader-background").style.opacity = 0;
        document.getElementById("loader-background").style.visibility = "hidden";
        shuffleOnStart();
    },2000);
})();