'use strict'
//-------------------------------------------------------------------
const resultsPannelUlElem = document.getElementById('results');
const itemImageSectionTag = document.getElementById('all_items');
const leftItemImageTag = document.getElementById('left_item_img');
const middleItemImageTag = document.getElementById('middle_item_img');
const rightItemImageTag = document.getElementById('right_item_img');
const leftItemH2Elem = document.getElementById('left_item_h2');
const middleItemH2Elem = document.getElementById('middle_item_h2');
const rightItemH2Elm = document.getElementById('right_item_h2');

let voteCounter= 0;

//---------------------------------------------------------------------
let currentLeftItem = null;
let currentMiddleItem = null;
let currentRightItem = null;
let maxVotesBeforeRendering = prompt("how many clicks are you ready for before stats");

//---------------------------------------------------------------------------
//make a constructor function for all item images
const Item = function(name, imgPath, votes, timesViewed){
  this.name = name;
  this.imgPath = imgPath;
  this.votes = votes; 
  this.timesViewed = timesViewed;

  Item.allItems.push(this)
}
Item.allItems = [];

//-----------------------------------------------------------------------------------
const makeItemChart = function(){
  const itemChart = document.getElementById('itemChart').getContext('2d');
  const itemData =[]; 
  const itemViews =[]; 
  const itemLabels= []; 

  for(let item of Item.allItems){
    itemData.push(item.votes);
    itemViews.push(item.timesViewed);
    itemLabels.push(item.name);
  }
 //---------------------------------------------------------------------------------
  const myChart = new Chart(itemChart, {
    type: 'bar',
    data: {
        labels: itemLabels,
        datasets: [{
            label: '# of Votes',
            data: itemData,
            backgroundColor: 'yellow',
    },{
      label: '# of Views',
            data: itemViews,
            backgroundColor: 'blue',
    }]
  },
  options: {
      scales: {
        yAxes: [{
          ticks:{
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//-----------------------------------------------------------------------------------
Item.prototype.renderItem= function(h2,imageTag){
  imageTag.src = this.imgPath;
  h2.textContent = this.name;
}

//-------------------------------------------------------------------------------------

function renderThreeItems(leftItem,middleItem, rightItem){
  leftItem.renderItem(leftItemH2Elem, leftItemImageTag);
  middleItem.renderItem(middleItemH2Elem, middleItemImageTag);
  rightItem.renderItem(rightItemH2Elm, rightItemImageTag);
}

//-------------------------------------------------------------------------------------
function pickItems(){
  const usedItems = [];
  usedItems.push(currentLeftItem);
  usedItems.push(currentMiddleItem);
  usedItems.push(currentRightItem);

  while(usedItems.includes(currentLeftItem)){
    let leftItemIndex = Math.floor(Math.random()*Item.allItems.length);
    currentLeftItem = Item.allItems[leftItemIndex];
  }
  usedItems.push(currentLeftItem);

  while(usedItems.includes(currentMiddleItem)){
    let middleItemIndex = Math.floor(Math.random()*Item.allItems.length);
    currentMiddleItem = Item.allItems[middleItemIndex];
  }
  usedItems.push(currentMiddleItem);

  while(usedItems.includes(currentRightItem)){
    let rightItemIndex = Math.floor(Math.random()*Item.allItems.length);
    currentRightItem = Item.allItems[rightItemIndex];

    }
  }

//-----------------------------------------------------------------------------
function renderResults(){
  resultsPannelUlElem.innerHTML= '';
  const h2Elem =document.createElement('h2');
  h2Elem.textContent = 'Item Likes';
  resultsPannelUlElem.appendChild(h2Elem);

  for(let item of Item.allItems){
    const liElem = document.createElement('li');
    liElem.textContent = `${item.name}: ${item.votes} votes , ${item.timesViewed} views`;
    resultsPannelUlElem.appendChild(liElem);
  }
  
  // Update local storage with view and votes.
  // persist all items in local storage
updateStorage();
}
//-------------------------------------------------------------------------------------
//function to update storage
 function updateStorage(){
  localStorage.setItem('prev_items', localStorage.getItem('items')); // to see previous key value pairs.
  const stringifiedItems = JSON.stringify(Item.allItems);
  localStorage.setItem('items', stringifiedItems);
}


//--------------------------------------------------------------------------------------
function handleClick(e){
  let thingTheyClickedOn = e.target;
  console.log(thingTheyClickedOn);
  if(voteCounter<maxVotesBeforeRendering-1){
    if (thingTheyClickedOn ===leftItemImageTag || thingTheyClickedOn === middleItemImageTag ||thingTheyClickedOn ===rightItemImageTag){
     voteCounter++;
     currentLeftItem.timesViewed++;
     currentMiddleItem.timesViewed++;
     currentRightItem.timesViewed++;
      if (thingTheyClickedOn ===leftItemImageTag){
      currentLeftItem.votes++;
      }else if(thingTheyClickedOn ===middleItemImageTag){
        currentMiddleItem.votes++;
      }else if(thingTheyClickedOn ===rightItemImageTag){
        currentRightItem.votes++;
      }
//-------------------------------------------------------------------------------------
    pickItems();
    renderThreeItems(currentLeftItem,currentMiddleItem,currentRightItem);
    }else{
      alert('you missed the item');
    }
  } else{
    itemImageSectionTag.removeEventListener('click', handleClick);
    renderResults();
    makeItemChart();
  }
}
//----------------------------------------------------------------------------------------
itemImageSectionTag.addEventListener('click', handleClick)

//-------------------------------------------------------------------------------------
// If local storage has items then set Item.allItems as the value from local storage and don't create these items
if(localStorage.getItem('items')) {
  let items = JSON.parse(localStorage.getItem('items'));
  for(let item of items) {
    new Item(item.name, item.imgPath,item.votes,item.timesViewed);
  }
  console.log(Item.allItems);
} else {
  new Item('bag', 'img/bag.jpg');
  new Item('banana', 'img/banana.jpg');
  new Item('bathroom', 'img/bathroom.jpg');
  new Item('boots', 'img/boots.jpg');
  new Item('breakfast', 'img/breakfast.jpg');
  new Item('bubblegum', 'img/bubblegum.jpg');
  new Item('chair', 'img/chair.jpg');
  new Item('cthulhu', 'img/cthulhu.jpg');
  new Item('dog-duck', 'img/dog-duck.jpg');
  new Item('dragon', 'img/dragon.jpg');
  new Item('pen', 'img/pen.jpg');
  new Item('pet-sweep', 'img/pet-sweep.jpg');
  new Item('scissors', 'img/scissors.jpg');
  new Item('shark', 'img/shark.jpg');
  new Item('sweep', 'img/sweep.png');
  new Item('tauntaun', 'img/tauntaun.jpg');
  new Item('unicorn', 'img/unicorn.jpg');
  new Item('water-can', 'img/water-can.jpg');
  new Item('wine-glass', 'img/wine-glass.jpg');
}


//-------------------------------------------------------------------------------------
pickItems();
renderThreeItems(currentLeftItem, currentMiddleItem, currentRightItem)
