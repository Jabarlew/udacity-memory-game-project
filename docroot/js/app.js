document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const gameTime = 0;
  let moves = 0;
  const gameTime_h1 = document.querySelector('.score-moves-counter');
  const cards = document.querySelectorAll('.item');
  let openedCards = [];

  function clickFunction() {
    openedCards.push(this);
    let count = openedCards.length;
    if (count === 2) {
      moves++
      console.log(moves);
      openedCards = [];
    }
  }
  cards.forEach(function (element, index) {
    cards[index].addEventListener('click', clickFunction);
  });
});
