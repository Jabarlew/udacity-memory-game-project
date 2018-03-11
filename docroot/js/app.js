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
        card.element.classList.add('selected');
      });
    });
  };


  startGame();































});
