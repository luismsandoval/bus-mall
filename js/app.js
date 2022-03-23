'use strict';

let rounds = 10;
let clicks = 0;
let productsArray = [];

let imgContainer = document.getElementById('container');
let img1 = document.getElementById('first');
let img2 = document.getElementById('second');
let img3 = document.getElementById('third');

let clicky = document.getElementById('clicky');
let results = document.getElementById('results');

function Products(name, path /*fileExtension = 'jpg'*/) {
  this.name = name;
  this.src = path /*`img/${name}.${fileExtension}`*/;
  this.votes = 0;
  this.view = 0;
  productsArray.push(this);
}

new Products('bag', 'img/bag.jpg');
new Products('banana', 'img/banana.jpg');
new Products('bathroom', 'img/bathroom.jpg');
new Products('boots', 'img/boots.jpg');
new Products('breakfast', 'img/breakfast.jpg');
new Products('bubblegum', 'img/bubblegum.jpg');
new Products('chair', 'img/chair.jpg');
new Products('cthulhu', 'img/cthulhu.jpg');
new Products('dog-duck', 'img/dog-duck.jpg');
new Products('dragon', 'img/dragon.jpg');
new Products('pen', 'img/pen.jpg');
new Products('pet-sweep', 'img/pet-sweep.jpg');
new Products('scissors', 'img/scissors.jpg');
new Products('shark', 'img/shark.jpg');
new Products('sweep', 'img/sweep.png');
new Products('tauntaun', 'img/tauntaun.jpg');
new Products('unicorn', 'img/unicorn.jpg');
new Products('water-can', 'img/water-can.jpg');
new Products('wine-glass', 'img/wine-glass.jpg');

console.log(productsArray);

function getRandomInt() {
  return Math.floor(Math.random() * productsArray.length);
}

function renderImages() {
  for (let i = 0; i < 1; i++) {
    if (clicks === rounds) {
      break;
    }
  }
  let uniqueProductIndex = [];

  while (uniqueProductIndex.length < 3) {
    let num = getRandomInt();
    while (uniqueProductIndex.includes(num)) {
      num = getRandomInt();
    }
    uniqueProductIndex.push(num);
  }
  img1.src = productsArray[uniqueProductIndex[0]].src;
  img2.src = productsArray[uniqueProductIndex[1]].src;
  img3.src = productsArray[uniqueProductIndex[2]].src;
}


function handleImageClick(event) {
  clicks++;
  let imageClicked = event.target.alt;

  for (let i = 0; i < productsArray.length; i++) {
    if (productsArray.name === imageClicked) {
      productsArray.votes++;
      console.log(productsArray);
    }
  }
  renderImages();

  if (clicks === results) {
    imgContainer.removeEventListener('click', handleImageClick);
  }
}

function handleResults(event) {

  if (clicks >= rounds) {
    for (let i = 0; i < productsArray.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${productsArray[i].name} had ${productsArray[i].votes} votes, and was seen ${productsArray[i].views} times`;
      results.appendChild(li);
    }
  }
}

renderImages();

imgContainer.addEventListener('click', handleImageClick);

clicky.addEventListener('click', handleResults);
