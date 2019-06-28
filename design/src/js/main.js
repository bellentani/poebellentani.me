"use strict"

console.log('entra');

var el = document.querySelector('body');
el.onclick = function() {
  console.log('clicked!');
  el.classList.toggle('portfolio--ui'); 
}
 