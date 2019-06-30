"use strict";

console.log('entra');
var elBody = document.querySelector('body'); // const elUx = document.querySelectorAll('[data-toggle-mod="ux"]');
// const elUi = document.querySelectorAll('[data-toggle-mod="ui"]');
// elUx.onclick = function() {
//   console.log('clicked! UX');
//   elBody.classList.toggle('portfolio--ux'); 
// }
// elUi.onclick = function() {
//   console.log('clicked! UI');
//   elBody.classList.toggle('portfolio--ui');
// }

document.addEventListener('click', function (event) {
  console.log('clique');

  if (event.target.closest('[data-toggle-mod="ux"]')) {
    elBody.classList.add('portfolio--ux');
    elBody.classList.remove('portfolio--ui');
    console.log('clique ux', event.target);
  }

  ;

  if (event.target.closest('[data-toggle-mod="ui"]')) {
    elBody.classList.add('portfolio--ui');
    elBody.classList.remove('portfolio--ux');
    console.log('clique ui', event.target);
  }

  ;

  if (event.target.closest('[data-toggle-mod="close"]')) {
    elBody.classList.remove('portfolio--ux');
    elBody.classList.remove('portfolio--ui');
  }

  ;
  event.preventDefault();
}, false);