// ALWAYS ON START
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const h1moves = document.querySelector('.moves-counter');
  const time = document.querySelector('.timer');
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let interval;
  let numberOfMoves = 0;
  let timerStarted = false;
  // /array of images
  const availableCardImages = [
    'badger.svg',
    'beawer.svg',
    'bull.svg',
    'cat.svg',
    'hiena.svg',
    'moose.svg',
    'panthera.svg',
    'zebra.svg',
  ]
    // /creates path to images from array of images
    .map(fileName => `img/${fileName}`);
  // keep track of active selections

  let selectedCards = [];

  function startGame() {
    // /Duplicate and shuffle card images
    const cardImages = _.shuffle(availableCardImages
      // /loops through array and duplicate it
      .reduce((acc, imgPath) => acc.concat([imgPath, imgPath]), []));

    // creates array from node list.
    const cards = Array.from(document.querySelectorAll('.board > li'))

      // /maps through array and create objects
      .map((li, i) => ({
        element: li,
        img: cardImages[i],
      }));
    // adds images
    function unselectCards() {
      selectedCards.forEach((card) => {
        card.element.classList.remove('opened');
        card.element.classList.remove('wrong-card');
      });
      selectedCards = [];
    }

    function endGame() {
      clearInterval(interval);
      const endText = document.querySelector('.message-text');
      const hide = document.querySelector('.screen');

      hide.classList.remove('hide');
      document.body.classList.add('win');
      if (numberOfMoves <= 13) {
        endText.innerHTML = `You made ${numberOfMoves} moves. Your time is ${hours} h ${minutes} m ${seconds} s. You get 3 stars! `;
      } if (numberOfMoves >= 14) {
        endText.innerHTML = `You made ${numberOfMoves} moves. Your time is ${hours} h ${minutes} m ${seconds} s. You get 2 stars! `;
      } if (numberOfMoves >= 17) {
        endText.innerHTML = `You made ${numberOfMoves} moves. Your time is ${hours} h ${minutes} m ${seconds} s. You get 1 star! `;
      }
    }

    function matchedCards() {
      selectedCards.forEach((card) => {
        card.element.classList.add('disabled');
        card.element.classList.add('matched');
        if (document.querySelectorAll('.matched').length === 16) endGame();
      });
      selectedCards = [];
    }


    function wrongCards() {
      selectedCards.forEach((card) => {
        card.element.classList.add('wrong-card');
      });
    }

    function startTimer() {
      function tick() {
        time.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
        seconds += 1;
        if (seconds === 60) {
          minutes += 1;
          seconds = 0;
        }
        if (minutes === 60) {
          hours += 1;
          minutes = 0;
        }
      }

      if (!timerStarted) {
        hours = 0;
        seconds = 0;
        minutes = 0;
        interval = setInterval(tick, 1000);
      }
    }
    // grades player by number of moves
    function grade() {
      const starOne = document.querySelector('.grade-star-one');
      const starTwo = document.querySelector('.grade-star-two');

      if (numberOfMoves === 14) {
        starOne.classList.remove('fas');
        starOne.classList.add('far');
      }
      if (numberOfMoves === 17) {
        starTwo.classList.remove('fas');
        starTwo.classList.add('far');
      }
    }
    // handles reset buttons
    document.querySelector('.reset').addEventListener('click', () => {
      document.location.reload();
    });
    document.querySelector('.message-play-again').addEventListener('click', () => {
      document.location.reload();
    });

    cards.forEach((card) => {
      const img = card.element.querySelector('img');
      img.src = card.img;
      // adds click event
      card.element.addEventListener('click', () => {
        if (!timerStarted) {
          startTimer();
          timerStarted = true;
        }
        // cant 2 cards to selectedCards and dont allow to add 2 times the same card
        if (selectedCards.length < 2 && card.element.classList.contains('opened') === false) {
          selectedCards.push(card);
          card.element.classList.add('opened');
          card.element.classList.remove('wrong');
          if (selectedCards.length === 2) {
            numberOfMoves += 1;
            grade();
            h1moves.innerHTML = numberOfMoves;
            if (selectedCards[0].img === selectedCards[1].img) {
              matchedCards();
            } else {
              setTimeout(wrongCards, 500);
              setTimeout(unselectCards, 1000);
            }
          }
        }
      });
    });
  }
  startGame();
});
