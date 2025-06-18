const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;

const moveCounter = document.getElementById("moves");
const resetBtn = document.getElementById("resetBtn");
const darkBtn = document.getElementById("darkModeBtn");

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  moveCounter.textContent = `Moves: ${moves}`;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  resetBoard();
  checkWin();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function checkWin() {
  const allFlipped = document.querySelectorAll('.memory-card.flip').length;
  if (allFlipped === cards.length) {
    setTimeout(() => {
      alert(`🎉 You won in ${moves} moves!`);
    }, 500);
  }
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

resetBtn.addEventListener("click", () => location.reload());

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

cards.forEach(card => card.addEventListener('click', flipCard));

shuffle();
