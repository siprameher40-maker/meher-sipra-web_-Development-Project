const moves = {
  rock: { label: "Rock", emoji: "✊" },
  paper: { label: "Paper", emoji: "✋" },
  scissors: { label: "Scissors", emoji: "✌️" },
};

const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");
const playerChoiceElement = document.querySelector("#player-choice");
const computerChoiceElement = document.querySelector("#computer-choice");
const resultElement = document.querySelector("#result");

let playerScore = 0;
let computerScore = 0;

function playRound(playerMove) {
  const choices = Object.keys(moves);
  const computerMove = choices[Math.floor(Math.random() * choices.length)];
  const outcome =
    playerMove === computerMove
      ? "tie"
      : beats[playerMove] === computerMove
        ? "win"
        : "lose";

  if (outcome === "win") playerScore += 1;
  if (outcome === "lose") computerScore += 1;

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  showChoice(playerChoiceElement, playerMove, "Your choice");
  showChoice(computerChoiceElement, computerMove, "Computer choice");

  const messages = {
    win: "You win this round!",
    lose: "Computer wins this round",
    tie: "It's a tie!",
  };
  resultElement.dataset.outcome = outcome;
  resultElement.lastElementChild.textContent = messages[outcome];
}

function showChoice(element, move, owner) {
  element.classList.add("is-picked");
  element.setAttribute("aria-label", `${owner}: ${moves[move].label}`);
  element.firstElementChild.textContent = moves[move].emoji;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
  resultElement.dataset.outcome = "";
  resultElement.lastElementChild.textContent = "Make your move";

  for (const [element, owner] of [
    [playerChoiceElement, "Your choice"],
    [computerChoiceElement, "Computer choice"],
  ]) {
    element.classList.remove("is-picked");
    element.setAttribute("aria-label", owner);
    element.firstElementChild.textContent = "✦";
  }
}

document.querySelectorAll(".move-button").forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.choice));
});

document.querySelector("#reset").addEventListener("click", resetGame);

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
  const keyMoves = { "1": "rock", "2": "paper", "3": "scissors" };
  if (keyMoves[event.key]) playRound(keyMoves[event.key]);
});
