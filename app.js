'use strict';
const resultsPannelUlElem = document.getElementById('itemClicks');

const firstImageTag = document.getElementById('img1');
const secondImageTag = document.getElementById('img2');
const rightImageTag = document.getElementById('img3');
const firstPicName = document.getElementById('picNameOne');
const secondPicName = document.getElementById('picNameTwo');
const rightPicName = document.getElementById('picNameThree');

let voteCounter = 0;


let firstPic = null;
let centerPic = null;
let rightPic = null;


function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.votes = 0;
  this.timesShown = 0;

  Product.allProducts.push(this)
}


Product.allProducts = [];

Product.prototype.renderItem = function(name, imageTag) {
  imageTag.src = this.imgPath;
  name.textContent = this.name;
}

function renderThreeProducts(firstImage, secondImage,rightImage) {
  firstImage.renderItem(firstPicName,firstImageTag );
  secondImage.renderItem(secondPicName,secondImageTag);
  rightImage.renderItem(rightPicName,rightImageTag );

}


function pickProducts() {
  const firstImgIndex = Math.floor(Math.random() * Product.allProducts.length);

  let secondImgIndex;
  let rightImgIndex;
  
  while (secondImgIndex === undefined || secondImgIndex === firstImgIndex) {
    secondImgIndex = Math.floor(Math.random() * Product.allProducts.length);
  }
  
  while (rightImgIndex === undefined || rightImgIndex === firstImgIndex || rightImgIndex === secondImgIndex) {
    rightImgIndex = Math.floor(Math.random() * Product.allProducts.length);
  }
  firstPic = Product.allProducts[firstImgIndex];
  centerPic = Product.allProducts[secondImgIndex];
  rightPic = Product.allProducts[rightImgIndex];
}

function renderResults() {
  resultsPannelUlElem.innerHTML = '';
  const h2Elem = document.createElement('h2');
  h2Elem.textContent = 'Products Picked';
  resultsPannelUlElem.appendChild(h2Elem);

  for (let item of Product.allProducts) {
    const liElm = document.createElement('li');
    liElm.textContent = `${item.name} : ${item.votes}`;
    resultsPannelUlElem.appendChild(liElm);
  }
}

function handleClick(e) {
  console.log('Hello, I am Listening');
  let thingTheyClickedOn = e.target;
  console.log(thingTheyClickedOn, firstImageTag.children);

  if (voteCounter < 25) {
    if (thingTheyClickedOn === firstImageTag || thingTheyClickedOn === secondImageTag || thingTheyClickedOn === rightImageTag) {
      voteCounter++;
      console.log("we made it")
     
      if (thingTheyClickedOn === firstImageTag) {
        firstPic.votes++;
      
      } else if (thingTheyClickedOn === secondImageTag) {
        centerPic.votes++;
     
      } else if (thingTheyClickedOn === rightImageTag) {
        rightPic.votes++;
      }

      pickProducts();
      console.log(firstPic,centerPic,rightPic);
      renderThreeProducts(firstPic, centerPic, rightPic);

    }  

  } else {
    firstImageTag.removeEventListener('click', handleClick);
    secondImageTag.removeEventListener('click', handleClick);
    rightImageTag.removeEventListener('click', handleClick);
    renderResults();
    callChart();
  }

}

// Event Listener
firstImageTag.addEventListener('click', handleClick);
secondImageTag.addEventListener('click', handleClick);
rightImageTag.addEventListener('click', handleClick);

// Calling the Products
new Product('Bag', '../img/bag.jpg');
new Product('Banana', '../img/banana.jpg');
new Product('Bathroom','../img/bathroom.jpg');
new Product('Boots','../img/boots.jpg');
new Product('Breakfast', '../img/breakfast.jpg');
new Product('Bubble Gum', '../img/bubblegum.jpg');
new Product('Chair', '../img/chair.jpg');
new Product('Cthulhu', '../img/cthulhu.jpg');
new Product('Dog-Duck', '../img/dog-duck.jpg');
new Product('Dragon', '../img/dragon.jpg');
new Product('Pen', '../img/pen.jpg');
new Product('Pet-Sweep', '../img/pet-sweep.jpg');
new Product('Scissors', '../img/scissors.jpg');
new Product('Shark', '../img/shark.jpg');
new Product('Sweep', '../img/sweep.png');
new Product('tauntaun', '../img/tauntaun.jpg');
new Product('Unicorn', '../img/unicorn.jpg');
new Product('Water Can', '../img/water-can.jpg');
new Product('Wine Glass', '../img/wine-glass.jpg');


// Calling the Functions
pickProducts();
console.log(firstPic);
console.log(centerPic);
console.log(rightPic);
renderThreeProducts(firstPic, centerPic, rightPic);

var ctx = document.getElementById('chart').getContext('2d');



var nameArray = [];
var voteArray = [];


console.log(voteArray);
function callChart(){
  for (let item of Product.allProducts) {

    nameArray.push(item.name);
    voteArray.push(item.votes);
    
    
  }
var myChart = new Chart(ctx, {
  
    type: 'bar',
    data: {
      labels: nameArray,
        datasets: [{
            label: '# of Votes',
            data: voteArray,
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