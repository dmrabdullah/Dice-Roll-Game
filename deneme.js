"use strict";

//Selecting Elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let diceEl = document.querySelector(".dice");

let currentScore, scores, activePlayer, playing;

//Starting Conditions

let init = function () {
  score0El.innerHTML = 0;
  score1El.innerHTML = 0;
  current0El.innerHTML = 0;
  current1El.innerHTML = 0;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
};

init();

let switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).innerHTML = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

diceEl.classList.toggle("hidden");

btnRoll.addEventListener("click", function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).innerHTML = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).innerHTML = scores[activePlayer];
    if (scores[activePlayer] >= 30) {
      playing = false;
      diceEl.classList.toggle("hidden");
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
