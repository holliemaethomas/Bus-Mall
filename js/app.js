'use strict';

Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

//contains all the products
Product.all = [];
Product.container = document.getElementById('image_container');
Product.justViewed = [];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');
Product.totalClicks = 0;


function Product(name) {
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}
for (var i = 0; i < Product.names.length; i++) {
  new Product(Product.names[i]);
}

function makeRandom() {
  return Math.floor(Math.random() * Product.names.length);
}

function displayPics() {
  var currentlyShowing = [];
  //make left image unique
  currentlyShowing[0] = makeRandom();
  while (Product.justViewed.indexOf(currentlyShowing[0]) !== -1) {
    console.error('Duplicate, rerun!');
    currentlyShowing[0] = makeRandom();
  }
  //make center image unique
  currentlyShowing[1] = makeRandom();
  while (currentlyShowing[0] === currentlyShowing[1] || Product.justViewed.indexOf(currentlyShowing[1]) !== -1) {
    console.error('Duplicate at center or in prior view! Re run!');
    currentlyShowing[1] = makeRandom();
  }
  //make right image unique
  currentlyShowing[2] = makeRandom();
  while (currentlyShowing[0] === currentlyShowing[2] || currentlyShowing[1] === currentlyShowing[2] || Product.justViewed.indexOf(currentlyShowing[2]) !== -1) {
    console.error('Duplicate at right! re run it.');
    currentlyShowing[2] = makeRandom();
  }
  //take it to the DOM
  for (var i = 0; i < 3; i++) {
    Product.pics[i].src = Product.all[currentlyShowing[i]].path;
    Product.pics[i].id = Product.all[currentlyShowing[i]].name;
    Product.all[currentlyShowing[i]].views += 1;
    Product.justViewed[i] = currentlyShowing[i];
  }
}
//event listener for keeping track of total clicks on images
function handleClick(event) {
  console.log(Product.totalClicks, 'total clicks');
  //make the clicks stop at 25
  if (Product.totalClicks > 5) {
    Product.container.removeEventListener('click', handleClick);
    //show the list after the last click
    showTally();
    getData();
    drawChart();
  }
  //this is how we direct the user to click on a specific image
  if (event.target.id === 'image_container') {
    return alert('Need to click on an image.');
  }
  //start to add up the total clicks and log it to the console
  Product.totalClicks += 1;
  for (var i = 0; i < Product.names.length; i++) {
    if (event.target.id === Product.all[i].name) {
      Product.all[i].votes += 1;
      console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views.');
    }
  }
  displayPics();
}

//show the tally using the list in the DOM once the event listener has been removed
function showTally() {
  for (var i = 0; i < Product.all.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views.';
    //append the li to the Product.tally created above globally for the ul
    Product.tally.appendChild(liEl);
  }
}
//event listener
Product.container.addEventListener('click', handleClick);
displayPics();

// gather data for chart
var totalVotes = [];
function getData(){
  for(var i = 0; i < Product.all.length; i++){
    totalVotes.push(Product.all[i].votes);
  }
}



// create the chart//////////////////////////////////////////////////////////////////////////
function drawChart(){
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
      datasets: [{
        label: '# of Votes',
        data: totalVotes,
        backgroundColor: [
          'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange',
          'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange', 'black', 'orange',

        ],
        borderColor: [
          'rgba(255,99,132,1)',
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
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}


// create function for local storage
 


var stringifyProducts = JSON.stringify(Product.names);
localStorage.setItem('names',stringifyProducts); 


function addLocalStorageOfClicks() {
  var localStorageData = JSON.stringify(Product.all);
  localStorage.setItem('Product', localStorageData);
  localStorage.getItem('Product', localStorageData);
  JSON.parse(localStorageData);
}
addLocalStorageOfClicks();





