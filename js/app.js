'use strict';

let rounds = 25;
let clicks = 0;
let productsArray = [];

let dataName = [];
let dataVotes = [];
let dataViews = [];

let imgContainer = document.getElementById('container');
let img1 = document.getElementById('first');
let img2 = document.getElementById('second');
let img3 = document.getElementById('third');

let clicky = document.getElementById('clicky');
let results = document.getElementById('results');




function Products(name, path) {
  this.name = name;
  this.src = path;
  this.votes = 0;
  this.views = 0;
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



function getRandomInt() {
  return Math.floor(Math.random() * productsArray.length);
}



let productIndex = [];

function renderImages() {

  while (productIndex.length < 6) {
    let num = getRandomInt();
    while (productIndex.includes(num)) {
      num = getRandomInt();
    }
    productIndex.push(num);
  }

  img1.src = productsArray[productIndex[0]].src;
  img2.src = productsArray[productIndex[1]].src;
  img3.src = productsArray[productIndex[2]].src;
  img1.alt = productsArray[productIndex[0]].name;
  img2.alt = productsArray[productIndex[1]].name;
  img3.alt = productsArray[productIndex[2]].name;
  productsArray[productIndex[0]].views++;
  productsArray[productIndex[1]].views++;
  productsArray[productIndex[2]].views++;

  while (productIndex.length > 3) {
    productIndex.shift();
  }

}

function handleImageClick(event) {
  clicks++;
  let imageClicked = event.target.alt;

  for (let i = 0; i < productsArray.length; i++) {
    if (productsArray[i].name === imageClicked) {
      productsArray[i].votes++;
    }
  }
  renderImages();

  if (clicks === rounds) {
    imgContainer.removeEventListener('click', handleImageClick);
  }
}

function handleResults(event) {

  if (clicks === rounds) {
    renderChart();
    for (let i = 0; i < productsArray.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${productsArray[i].name} had ${productsArray[i].votes} votes, and was seen ${productsArray[i].views} times`;
      results.appendChild(li);
      clicks = 0;
    }
  }
}


function getData() {
  for (let i = 0; i < productsArray.length; i++) {
    dataName.push(productsArray[i].name);
    dataVotes.push(productsArray[i].votes);
    dataViews.push(productsArray[i].views);
  }
}


function renderChart() {
  getData();
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dataName,
      datasets: [{
        label: '# of Votes',
        data: dataVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: dataViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

renderImages();

imgContainer.addEventListener('click', handleImageClick);

clicky.addEventListener('click', handleResults);
