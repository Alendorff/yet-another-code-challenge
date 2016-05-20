'use strict';
var nop = function(){};
var cap = $('#cap');
var bottle = $('#bottle');
var text = $('#cta .text');
var cta = $('#cta');
var carousel = $('#carousel');
var canv = document.getElementById('Canvas');
var ctx = canv.getContext('2d');

var sh = new ShakeHandler(function shake(){
	foam.shake()
}, {
	threshold: 6,
	fallback: function(){
		text.html('Jetzt das Handy<br> antippen!');
		document.body.addEventListener('click', yay)
	}
});

sh.start();
var vibrateMaybe = 'vibrate' in window.navigator
			? window.navigator.vibrate.bind(window.navigator)
			: nop;

var raf = window.requestAnimationFrame 
      || function(fn){setTimeout(fn, 40)}

var cap  = new Cap({canv: canv, fadeDuration: 750, waitDuration: 2000, ctx: ctx});
var foam = new Foam({cb: Cap.prototype.start.bind(cap),
										 canv: canv,
										 magic: 100,
										 ctx: ctx,
										 shakesNeeded: 6,
										 shakeTime: 750,
										 });

var yayCalled = false;
function yay(){
	console.log('yay');
	if (yayCalled) return;
	sh.stop();
	yayCalled = true;
	text.html('');
	bottle.addClass('openBottle');
	vibrateMaybe(500);
	fadeToNext();
}


AnimatingObject.animateCanvas({
	canv: canv,
	objects: [foam, cap],
	ctx: ctx,
	callback: yay
});

preloadImages();
function preloadImages(){
	// draw an element with the background images out of site
	var elem = $('<div></div>');
	$(document.body).append(elem);
	elem.css({
		position: 'absolute',
		top: '-1000%',
		left: '-1000%',
	});
	raf(function(){
		elem.addClass('openBottle');
		raf(function(){
			elem.remove();
		})
	})
}

/*we're nice*/
$(document.body).click(function(){
  foam.shake();
})

function fadeToNext(){
  /*some fade to the next state*/
}
