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
    cards.forEach((card) => {
      const img = card.element.querySelector('img');
      img.src = card.img;
      // adds click event
      card.element.addEventListener('click', () => {
        // prevent ading more than 2 cards to selectedCards and dont allow to add 2 times the same card
        if (selectedCards.length < 2 && card.element.classList.contains('opened') === false) {
          selectedCards.push(card);
          card.element.classList.add('opened');
          card.element.classList.remove('wrong');
          if (selectedCards.length === 2) {
            numberOfMoves++;
            startTimer();
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

  function unselectCards() {
    selectedCards.forEach((card) => {
      card.element.classList.remove('opened');
      card.element.classList.remove('wrong-card');
    });
    selectedCards = [];
  }

  function matchedCards() {
    selectedCards.forEach((card) => {
      card.element.classList.add('disabled');
      card.element.classList.add('matched');
    });
    selectedCards = [];
  }

  function wrongCards() {
    selectedCards.forEach((card) => {
      card.element.classList.add('wrong-card');
    });
  }

  function timer() {
    interval = setInterval(function () {
      time.innerHTML = hours + 'h ' + minutes + 'min ' + seconds + 'sec.';
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      if (minutes === 60) {
        hours++;
        minutes = 0;
      }

    }, 1000);
  }

  function startTimer() {
    if (numberOfMoves === 1) {
      hours = 0;
      seconds = 0;
      minutes = 0;
      timer();
    }
  }
});
