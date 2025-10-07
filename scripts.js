const cards = document.querySelectorAll('.memory-card');
const shuffleBtn = document.querySelector('.shuffle-btn');
const resetBtn = document.querySelector('.reset-btn');

let flippedCards = [];
let matchedCards = new Set();

function flipCard() {
  // Prevent re-flipping matched cards or already flipped ones
  if (this.classList.contains('flip') || matchedCards.has(this)) return;

  this.classList.add('flip');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;

    if (card1.dataset.framework === card2.dataset.framework) {
      matchedCards.add(card1);
      matchedCards.add(card2);
      flippedCards = []; // Reset flipped pair
    } else {
      // Temporarily store the pair, but allow other cards to flip
      setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        flippedCards = []; // Reset for next turn
      }, 1000);
    }
  } else if (flippedCards.length > 2) {
    // If user flips more than 2 quickly, reset the previous unmatched pair
    const [card1, card2] = flippedCards.splice(0, 2);
    if (!matchedCards.has(card1) && !matchedCards.has(card2) && !matchedCards.has(card3)) {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      card3.classList.remove('flip');
    
    }
  }
}

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

function resetGame() {
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  flippedCards = [];
  matchedCards.clear();
  shuffleCards();
}

// Initial shuffle
shuffleCards();

// Button event listeners
shuffleBtn.addEventListener('click', shuffleCards);
resetBtn.addEventListener('click', resetGame);

// Attach click listeners
cards.forEach(card => card.addEventListener('click', flipCard));
