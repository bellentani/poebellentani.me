"use strict"

//console.log('entra');

const elBody = document.querySelector('body');
// const elUx = document.querySelectorAll('[data-toggle-mod="ux"]');
// const elUi = document.querySelectorAll('[data-toggle-mod="ui"]');

// elUx.onclick = function() {
//   console.log('clicked! UX');
//   elBody.classList.toggle('portfolio--ux'); 
// }
// elUi.onclick = function() {
//   console.log('clicked! UI');
//   elBody.classList.toggle('portfolio--ui');
// }

//get parameters from URL
var currenthash = window.location.hash;
console.log(currenthash);
if (currenthash == "#ux") {
  elBody.classList.add('portfolio--ux');
  elBody.classList.remove('portfolio--ui');
  //console.log('clique ux', event.target);
};
if (currenthash == "#ui") {
  elBody.classList.add('portfolio--ui');
  elBody.classList.remove('portfolio--ux');
  //console.log('clique ui', event.target);
};

//change sections on click
document.addEventListener('click', function (event) {
  //console.log('clique');
  if (event.target.closest('[data-toggle-mod="ux"]')) {
    elBody.classList.add('portfolio--ux');
    elBody.classList.remove('portfolio--ui');
    //console.log('clique ux', event.target);
  };
  if (event.target.closest('[data-toggle-mod="ui"]')) {
    elBody.classList.add('portfolio--ui');
    elBody.classList.remove('portfolio--ux');
    //console.log('clique ui', event.target);
  };
  if (event.target.closest('[data-toggle-mod="close"]')) {
    elBody.classList.remove('portfolio--ux');
    elBody.classList.remove('portfolio--ui');
  };
  //event.preventDefault();
}, false);

//loop
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

var imageBg = document.querySelectorAll('[data-image-replace]');
forEach(imageBg, function (index, value) {
  //console.log(index, value); // passes index + value back!
  let imageName = imageBg[index].childNodes[1].src;
  //console.log(imageName, imageBg, 'antes');
  imageBg[index].classList.add('bg-img-invisible');
  imageBg[index].style.backgroundImage = 'url("' + imageName + '")';
  //console.log(imageName, 'depois');
});

function setBgImg(i) {
  // for (i = 0; i < divs.length; ++i) {
  //   const imageName = imageBg.childNodes[1].src;
  //   console.log(imageName, imageBg, 'oie');
  //   imageBg.style.backgroundImage = imageName;
  //   //imageBg.style[property] = 'background-image' + imageName;
  // }
}
//setBgImg(imageBg);

let varEnter = "Poe";
let varTest = `Teste do ${varEnter}`;
console.log(varTest);