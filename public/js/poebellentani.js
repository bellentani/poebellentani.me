"use strict";window.addEventListener("load",function(){setTimeout(function(){var e=new SplitText("#first-line",{type:"words,chars"}),o=new SplitText("#second-line",{type:"words,chars"}),t=e.chars,s=o.chars,l=new TimelineLite;(new TimelineLite).staggerFrom(s,.6,{scale:4,autoAlpha:0,rotationX:-180,transformOrigin:"100% 50%",ease:Back.easeOut},.02),l.staggerFrom(t,.8,{opacity:0,scale:0,y:80,rotationX:180,transformOrigin:"0% 50% -50",ease:Back.easeOut},.01,"+=0");var a=document.querySelector(".section-banner__animate .orangescreen");TweenMax.fromTo(a,.5,{css:{transform:"scale(0,0)"}},{css:{transform:"scale(1,1)"},onComplete:function(){!function(){var e=document.querySelector(".section-banner__animate .graphic-notebook");TweenMax.fromTo(e,.5,{css:{height:0,top:"330px"}},{css:{height:"230px",top:"100px"}})}()}});var n=document.querySelector(".section-banner__animate .boy-sit-notebook");TweenMax.fromTo(n,1,{css:{top:"-235px"}},{css:{top:"35px"}})},500)});var header=document.querySelector(["header[data-header]"]),body=document.querySelector(["body"]);function headerFixed(){window.innerHeight<window.pageYOffset+10?(header.classList.add("header-main--fixed"),body.classList.add("body-header-fixed")):(header.classList.remove("header-main--fixed"),body.classList.remove("body-header-fixed"))}window.onscroll=function(){headerFixed()};var sticky=header.offsetTop,controller=new ScrollMagic.Controller,bannerDivHeight=document.querySelector('[data-section="banner"]').clientHeight,aboutDivHeight=document.querySelector('[data-section="about"]').clientHeight,servicesDivHeight=document.querySelector('[data-section="services"]').clientHeight,clientsDivHeight=document.querySelector('[data-section="clients"]').clientHeight,scroll=new SmoothScroll('a[href*="#"]');new ScrollMagic.Scene({triggerElement:"[data-section='banner']",duration:bannerDivHeight}).setClassToggle("#home-link","active").addTo(controller),new ScrollMagic.Scene({triggerElement:"[data-section='about']",duration:aboutDivHeight+servicesDivHeight}).setClassToggle("#about-link","active").addTo(controller),new ScrollMagic.Scene({triggerElement:"#about"}).setClassToggle("#about .align-items-center > *","bounceIn").addTo(controller),new ScrollMagic.Scene({triggerElement:".service__item"}).setClassToggle(".service__icon","bounceIn").addTo(controller),new ScrollMagic.Scene({triggerElement:"#clients"}).setClassToggle(".section-clients .brand","bounceIn").addTo(controller);var toogleMenu=document.querySelector(".header-main .navbar-toggler");body=document.querySelector("body");toogleMenu.onclick=function(e){e.stopPropagation(),body.classList.toggle("body--menu-opened")},document.addEventListener("click",function(e){body.classList.contains("body--menu-opened")&&body.classList.remove("body--menu-opened")});var x=0,y=window.pageYOffset,lastX=0,lastY=0,xNew=null,yNew=null,interval=null,ghost=document.getElementsByClassName("easter-egg")[0];ghost.classList.add("hidden");var lista=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA"],listaIndex=0;function inRange(e,o){return Math.abs(e-o)<10}document.addEventListener("keyup",function(e){if("Escape"===e.code)return ghost.classList.add("hidden"),clearInterval(interval);e.code!==lista[listaIndex]?listaIndex=0:10===(listaIndex+=1)&&"KeyA"===e.code&&(y=window.pageYOffset,console.log("ghostY",window.pageYOffset,ghost.style),ghost.classList.remove("hidden"),interval=setInterval(function(){calculate()},100))}),document.addEventListener("mousemove",function(e){var o=e.pageX,t=e.pageY;lastX=o,lastY=t});var movimento=15;function calculate(){var e=null,o=null;inRange(lastX,x)||(xNew=x<lastX?x+=movimento:x-=movimento,ghost.style.left="".concat(xNew,"px"),e=x<lastX,x=xNew),inRange(lastY,y)||(yNew=y<lastY?y+=movimento:y-=movimento,ghost.style.top="".concat(yNew,"px"),o=lastY<y,y=yNew),calculateEyes(e,o)}function calculateEyes(e,o){var t=document.querySelector(".easter-egg__eye--left"),s=document.querySelector(".easter-egg__eye--right");if(null==e&&null==o)return t.classList.remove("look-left","look-right","look-top","look-bottom"),void s.classList.remove("look-left","look-right","look-top","look-bottom");null==e&&(t.classList.remove("look-left"),s.classList.remove("look-left"),t.classList.remove("look-right"),s.classList.remove("look-right")),null==o&&(t.classList.remove("look-top"),s.classList.remove("look-top"),t.classList.remove("look-bottom"),s.classList.remove("look-bottom")),e&&(t.classList.remove("look-left"),s.classList.remove("look-left"),t.classList.add("look-right"),s.classList.add("look-right")),null===e||e||(t.classList.add("look-left"),s.classList.add("look-left"),t.classList.remove("look-right"),s.classList.remove("look-right")),o&&(t.classList.remove("look-bottom"),s.classList.remove("look-bottom"),t.classList.add("look-top"),s.classList.add("look-top")),null===o||o||(t.classList.remove("look-top"),s.classList.remove("look-top"),t.classList.add("look-bottom"),s.classList.add("look-bottom"))}