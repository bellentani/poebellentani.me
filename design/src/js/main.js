"use strict"

window.addEventListener("load", function () {
  setTimeout(function () {
    var firstLineText = new SplitText("#first-line", { type: "words,chars" })
    var secondLineText = new SplitText("#second-line", { type: "words,chars" });
    var firstLineChars = firstLineText.chars;
    var secondLineChars = secondLineText.chars;
    var firstLineTimeline = new TimelineLite();
    var secondLineTimeLine = new TimelineLite();

    secondLineTimeLine.staggerFrom(secondLineChars, 0.6, { scale: 4, autoAlpha: 0, rotationX: -180, transformOrigin: "100% 50%", ease: Back.easeOut }, 0.02);
    firstLineTimeline.staggerFrom(firstLineChars, 0.8, { opacity: 0, scale: 0, y: 80, rotationX: 180, transformOrigin: "0% 50% -50", ease: Back.easeOut }, 0.01, "+=0");


    function graphShow() {
      var graph = document.querySelector('.section-banner__animate .graphic-notebook')
      TweenMax.fromTo(graph, 0.5, {
        css: {
          height: 0,
          top: '330px'
        }
      }, {
          css: {
            height: '230px',
            top: '100px'
          }
        });
    }

    var orangeScreen = document.querySelector('.section-banner__animate .orangescreen');
    TweenMax.fromTo(orangeScreen, 0.5, {
      css: {
        transform: 'scale(0,0)'
      }
    }, {
        css: {
          transform: 'scale(1,1)'
        }, onComplete: function () { graphShow() }
      });
    var boySitNotebook = document.querySelector('.section-banner__animate .boy-sit-notebook')
    TweenMax.fromTo(boySitNotebook, 1, {
      css: {
        top: '-235px'
      }
    }, {
        css: {
          top: '35px'
        }
      });
  }, 500);
});

// When the user scrolls the page, execute myFunction

// Get the header
var header = document.querySelector(['header[data-header]']);
var body = document.querySelector(['body']);

// Get the offset position of the navbar
window.onscroll = function () { headerFixed() };

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function headerFixed() {
  if (window.innerHeight < (window.pageYOffset + 10)) {
    header.classList.add('header-main--fixed');
    body.classList.add('body-header-fixed');
  } else {
    header.classList.remove('header-main--fixed');
    body.classList.remove('body-header-fixed');
  }
}

// Get the offset position of the navbar
var sticky = header.offsetTop;

var controller = new ScrollMagic.Controller();

var bannerDivHeight = document.querySelector('[data-section="banner"]').clientHeight;
var aboutDivHeight = document.querySelector('[data-section="about"]').clientHeight;
var servicesDivHeight = document.querySelector('[data-section="services"]').clientHeight;
var clientsDivHeight = document.querySelector('[data-section="clients"]').clientHeight;

// window.addEventListener('resize', function (e) {
//   bannerDivHeight = document.querySelector('[data-section="banner"]').clientHeight;
//   aboutDivHeight = document.querySelector('[data-section="about"]').clientHeight;
//   servicesDivHeight = document.querySelector('[data-section="services"]').clientHeight;
//   clientsDivHeight = document.querySelector('[data-section="clients"]').clientHeight;
// })

var scroll = new SmoothScroll('a[href*="#"]');

new ScrollMagic.Scene({ triggerElement: "[data-section='banner']", duration: bannerDivHeight })
  .setClassToggle('#home-link', "active")
  .addTo(controller);
new ScrollMagic.Scene({ triggerElement: "[data-section='about']", duration: aboutDivHeight + servicesDivHeight })
  .setClassToggle('#about-link', "active")
  .addTo(controller);
// new ScrollMagic.Scene({ triggerElement: "[data-section='services']", duration: servicesDivHeight })
//   .setClassToggle('#clients-link', "active")
//   .addTo(controller);
// new ScrollMagic.Scene({ triggerElement: "[data-section='clients']", duration: clientsDivHeight })
//   .setClassToggle('#clients-link', "active")
//   .addTo(controller);


//add animate.css
new ScrollMagic.Scene({ triggerElement: "#about" })
  .setClassToggle("#about .align-items-center > *", "bounceIn")
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: ".service__item" })
.setClassToggle(".service__icon", "bounceIn")
.addTo(controller);

new ScrollMagic.Scene({ triggerElement: "#clients" })
.setClassToggle(".section-clients .brand", "bounceIn")
.addTo(controller);

//
var toogleMenu = document.querySelector('.header-main .navbar-toggler');
var body = document.querySelector('body');

toogleMenu.onclick = function(e) {
  e.stopPropagation();
  body.classList.toggle('body--menu-opened');
}
//Vigia click no toggle menu
document.addEventListener('click', function(event) {
  if (body.classList.contains('body--menu-opened')) {
    body.classList.remove('body--menu-opened');
  }
});

//easter egg
var x = 0;
var y = window.pageYOffset;
var lastX = 0;
var lastY = 0;
var xNew = null;
var yNew = null;
var interval = null;
var ghost = document.getElementsByClassName('easter-egg')[0];
ghost.classList.add('hidden');
var lista = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
var listaIndex = 0;
document.addEventListener('keyup', function (event) {
  if (event.code === 'Escape') {
    ghost.classList.add('hidden');
    return clearInterval(interval);
  }

  if (event.code === lista[listaIndex]) {
    listaIndex += 1;

    if (listaIndex === 10 && event.code === 'KeyA') {
      y = window.pageYOffset;
      console.log('ghostY', window.pageYOffset, ghost.style);
      ghost.classList.remove('hidden');
      interval = setInterval(function () {
        calculate();
      }, 100);
    }

    return;
  }

  listaIndex = 0;
});
document.addEventListener('mousemove', function (_ref) {
  var pageX = _ref.pageX,
      pageY = _ref.pageY;
  lastX = pageX;
  lastY = pageY;
}); // código konami
// up up down down left right left right B A

function inRange(value, valueNew) {
  return Math.abs(value - valueNew) < 10;
}

var movimento = 15;

function calculate() {
  var xPos = null;
  var yPos = null;

  if (!inRange(lastX, x)) {
    xNew = x < lastX ? x += movimento : x -= movimento;
    ghost.style.left = "".concat(xNew, "px");
    xPos = x < lastX;
    x = xNew;
  }

  if (!inRange(lastY, y)) {
    yNew = y < lastY ? y += movimento : y -= movimento;
    ghost.style.top = "".concat(yNew, "px");
    yPos = y > lastY;
    y = yNew;
  }

  calculateEyes(xPos, yPos);
}

function calculateEyes(valueX, valueY) {
  var leftEye = document.querySelector('.easter-egg__eye--left');
  var rightEye = document.querySelector('.easter-egg__eye--right');

  if (valueX == null && valueY == null) {
    leftEye.classList.remove('look-left', 'look-right', 'look-top', 'look-bottom');
    rightEye.classList.remove('look-left', 'look-right', 'look-top', 'look-bottom');
    return;
  }

  if (valueX == null) {
    leftEye.classList.remove('look-left');
    rightEye.classList.remove('look-left');
    leftEye.classList.remove('look-right');
    rightEye.classList.remove('look-right');
  }

  if (valueY == null) {
    leftEye.classList.remove('look-top');
    rightEye.classList.remove('look-top');
    leftEye.classList.remove('look-bottom');
    rightEye.classList.remove('look-bottom');
  }

  if (valueX) {
    leftEye.classList.remove('look-left');
    rightEye.classList.remove('look-left');
    leftEye.classList.add('look-right');
    rightEye.classList.add('look-right');
  }

  if (valueX !== null && !valueX) {
    leftEye.classList.add('look-left');
    rightEye.classList.add('look-left');
    leftEye.classList.remove('look-right');
    rightEye.classList.remove('look-right');
  }

  if (valueY) {
    leftEye.classList.remove('look-bottom');
    rightEye.classList.remove('look-bottom');
    leftEye.classList.add('look-top');
    rightEye.classList.add('look-top');
  }

  if (valueY !== null && !valueY) {
    leftEye.classList.remove('look-top');
    rightEye.classList.remove('look-top');
    leftEye.classList.add('look-bottom');
    rightEye.classList.add('look-bottom');
  }
}