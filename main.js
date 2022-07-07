"use strict";

// selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const diceEl = document.querySelector(".dice");

const resetButton = document.querySelector(".btn--new");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");

let scoreCounter, activePlayer, scores, playingState;

const init = function () {
  scoreCounter = 0;
  activePlayer = 0;
  scores = [0, 0];
  playingState = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// functions to refactore code
const switchingPlayers = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  scoreCounter = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    scoreCounter;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// when the player roll a dice
rollButton.addEventListener("click", function () {
  if (playingState) {
    // generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //   display the rolled dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //   calculating the score based on the rolled dices
    if (dice !== 1) {
      scoreCounter += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        scoreCounter;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchingPlayers();
    }
  }
});

// when the player hold his results
holdButton.addEventListener("click", function () {
  if (playingState) {
    scores[activePlayer] += scoreCounter;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    if (scores[activePlayer] >= 100) {
      playingState = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchingPlayers();
    }
  }
});

// when the play wants to start a new game
resetButton.addEventListener("click", init);
