//ALWAYS ON START
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  ///array of images
  const availableCardImages = [
      'bear.png',
      'elephant.png',
      'giraffe.png',
      'lion.png',
      'mpalmer.png',
      'panda.png',
      'rabbit.png',
      'rhino.png'
    ]
    ///creates path to images from array of images
    .map(fileName => `img/${fileName}`);
  //keep track of active selections

  let selectedCards = [];

  function startGame() {
    ///Duplicate and shuffle card images
    const cardImages = _.shuffle(availableCardImages
      ///loops through array and duplicate it
      .reduce((acc, imgPath) => acc.concat([imgPath, imgPath]), []));

    //creates array from node list.
    const cards = Array.from(document.querySelectorAll('.board > li'))

      ///maps through array and create objects
      .map((li, i) => ({
        element: li,
        img: cardImages[i],
      }));
    //adds images
    cards.forEach((card) => {
      const img = card.element.querySelector('img');
      img.src = card.img;

      card.element.addEventListener('click', () => {
        selectedCards.push(card);
        card.element.classList.add('opened')
        console.log(selectedCards);
        if (selectedCards.length === 2) {
          if (selectedCards[0].img === selectedCards[1].img) {
            card.element.classList.add('disabled');
            selectedCards = [];
          } else {
            setTimeout(unselectCards, 1100);
          }
        }
        if (selectedCards >= 2) {
          selectedCards = [];
        }
      });
    });
  };


  startGame();



  function unselectCards() {
    selectedCards.forEach((card) => {
      card.element.classList.remove('opened');
    });
    selectedCards = [];
  };


























});
