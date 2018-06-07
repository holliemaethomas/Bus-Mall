'use strict';

// // ...................Global..................................

Product.names = ['bag', 'banana', 'bathroom','boots', 'breakfast', 'chair', 'cthulu', 'dog-duck', 'dragon','pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
product.all = [];
product.container = document.getElementById('image_container');
product.justViewed = [];
product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
product.tally = document.getElementById('tally');
product.totalClicks = 0;


function Product(name){
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  product.all.push(this);
  
}
for(var i = 0; i< products.names; i++){
  new Product(Product.name[i]);


function makeRandom(){
  return Math.floor(Math.random()* Product.names.length); 
}

  function displayPics() {
    var currentlyShowing = [];
    //make the left image unique
    currentlyShowing[0] = makeRandom();
    while (Product.justViewed.indexOf(currentlyShowing[0]) !== -1) {
      console.log('Duplicate, rerun!');
      currentlyShowing[0] = makeRandom();
    }
    //make the center image unique
    currentlyShowing[1] = makeRandom();
    while (currentlyShowing[0] === currentlyShowing[1] || Product.justViewed.indexOf(currentlyShowing[1]) !== -1) {
      console.error('Duplicate at center or in prior view! Re run!');
      currentlyShowing[1] = makeRandom();
    }
    //make the right image unique
    currentlyShowing[2] = makeRandom();
    while (currentlyShowing[0] === currentlyShowing[2] || currentlyShowing[1] === currentlyShowing[2] || Product.justViewed.indexof(currentlyShowing[2]) !== -1) {
      console.error('Duplicate at right! Re run it.');
      currentlyShowing[2] = makeRandom();
    }
    
    displayPics();

    for (var i = 0; i < 3; i++) {
      product.pics[i].src = Product.all[currentlyShowing [i]].path;
      product.pics[i].id = Product.all [currentlyShowing[i]].name;
      Product.all[currentlyShowing[i]].views += 1;
      Product.justViewed[i] = currentlyShowing[i];

    } 
    
    // event listener for keeping track of total clicks on images
    function handleClick(event){
console.log (Product.totalClicks, 'total clicks');
if (Product.totalClicks > 24) {
  product.container.removeEventListener('click', handleClick);
  showTally ();
}
if(event.target.id === 'image_container'){
  return alert('need to click on an image.')
}
Product.totalClicks += 1;
for(var i = 0; i < Product.names.length; i++){
  if(event.targer.id === Product.all[i].name)
  Product.all[i].votes += 1;
  console.log(event.target.id + ' has ' + Product.all[i].votes + 'votes in ' + Product.all[i].views + ' views');
}
    }

    displayPics();
  }

  function showTally(){
    for (var i = 0; i < Product.all.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = Product.all[i].name + ' has ' + Product.all.[i].votes + ' votes in'+ Product.all[i].views + ' views.';
      Product.tally.appendChild(liEL);
    }
  }

  Product.container.addEventListener('click', handleClick);
  displayPics ();