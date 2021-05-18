'use strict'

const resultsPannelUlElem = document.getElementById('results');
const allProductsSectionTag = document.getElementById('all_products');
const firstImageTag = document.getElementById('first_img');
const secondImageTag = document.getElementById('second_img');
const thirdImageTag = document.getElementById('third_img');
const firstImgH2Elem = document.getElementById('first_h2');
const secondImgH2Elem = document.getElementById('second_h2');
const thirdImgH2Elem = document.getElementById('third_h2');

let voteCounter = 0;

let currentFirstImage = null;
let currentSecondImage = null;
let currentThirdImage = null;

function Product(name, imgPath){
   // this.name = name;
    this.imgPath = imgPath;
    this.votes = 0; //the other properties havent been seen. set them to 0
    this.views = 0; //everytime you click on an object increase this value

    Product.allProducts.push(this)//push this whenever the object is instantiated (into the allProducts arrary)
}

Product.allProducts = [];

Product.prototype.renderProduct = function(h2,imageTag){
    imageTag.src = this.imgPath;
    h2.textContent = this.name;
}

function renderThreeProducts(firstImage, secondImage, thirdImage){
    firstImage.renderProduct(firstImgH2Elem , firstImageTag);
    secondImage.renderProduct(secondImgH2Elem, secondImageTag);
    thirdImage.renderProduct(thirdImgH2Elem, thirdImageTag);
}

function randomImage(){
    const firstRandom = Math.floor(Math.random() * allProducts.length);
    const secondRandom = Math.floor(Math.random() * allProducts.length);
  const thirdRandom = Math.floor(Math.random() * allProducts.length);

  while (firstRandom === secondRandom || firstRandom === thirdRandom || secondRandom === thirdRandom) {
    firstRandom = Math.floor(Math.random() * allProducts.length);
    secondRandom = Math.floor(Math.random() * allProducts.length);
    thirdRandom = Math.floor(Math.random() * allProducts.length);
}
 currentFirstImage = Product.allProducts[firstRandom];
 currentSecondImage = Product.allProducts[secondRandom];
 currentThirdImage = Product.allProducts[thirdRandom];
}

function renderResults(){
    resultsPannelUlElem.innerHTML = '';
    const h2Elem = document.createElement('h2');
  h2Elem.textContent = 'Results';
  resultsPannelUlElem.appendChild(h2Elem);
  for(let i=0; i<Product.allProducts.length;i++){
    const liElem = document.createElement('li');
       liElem.textContent = `${allProducts.name} : ${allProducts.votes}`;
      resultsPannelUlElem.appendChild(liElem);
  }

}

function handleImageClick(event){
    let userClick = e.target;

  if (voteCounter < 7){
    if ((userClick === firstImageTag || userClick === secondImageTag) || userClick === thirdImageTag) {
        voteCounter++;
        if (userClick === firstImageTag){
          currentFirstImage.votes++;
        } else if (userClick === secondImageTag) {
          currentSecondImage.votes++;
        } else {
          currentThirdImage.votes++
        }
        randomImage();
        renderThreeProducts(currentFirstImage, currentSecondImage, currentThirdImage);
      } else {
      alert(`Choose a desired product by clicking its image`);
      }
    } else {
        allProductsSectionTag.removeEventListener('click', clickListen);
       renderResults();
    
    }
  }
  allProductsSectionTag.addEventListener('click', clickListen);

new Product('bag', '../assets/bag.jpg');
new Product('banana', '../assets/banana.jpg');
new Product('bathroom', '../assets/bathroom.jpg');
new Product('boots', '../assets/boots.jpg');
new Product('breakfast', '../assets/breakfast.jpg');
new Product('bubblegum', '../assets/bubblegum.jpg');
new Product('chair', '../assets/chair.jpg');
new Product('cthulhu', '../assets/cthulhu.jpg');
new Product('dog-duck', '../assets/dog-duck.jpg');
new Product('dragon', '../assets/dragon.jpg');
new Product('pen', '../assets/pen.jpg');
new Product('pet-sweep', '../assets/pet-sweep.jpg');
new Product('scissors', '../assets/scissors.jpg');
new Product('shark', '../assets/shark.jpg');
new Product('sweep', '../assets/sweep.png');
new Product('tauntaun', '../assets/tauntaun.jpg');
new Product('unicorn', '../assets/unicorn.jpg');
new Product('water-can', '../assets/water-can.jpg');
new Product('wine-glass', '../assets/wine-glass.jpg');

randomImage();
renderThreeProducts(currentFirstImage, currentSecondImage, currentThirdImage);

