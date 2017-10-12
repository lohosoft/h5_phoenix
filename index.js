console.log("index.js");
var myGlobal = {};
var song;
window.onload = init;
function init() {
	if (!window.DeviceOrientationEvent && !window.DeviceMotion) {
		noluck();
	} else {
		prepare();
	}
}
function prepare() {
	myGlobal.tick = 0;
	myGlobal.update = true;
	myGlobal.a = 0;
	myGlobal.b = 0;
	myGlobal.g = 0;
	myGlobal.x = 0;
	myGlobal.y = 0;
	myGlobal.z = 0;

	myGlobal.a0 = 0;
	myGlobal.b0 = 0;
	myGlobal.g0 = 0;
	myGlobal.x0 = 0;
	myGlobal.y0 = 0;
	myGlobal.z0 = 0;
	/**
 		* Provides requestAnimationFrame in a cross browser way.
 		* @author paulirish / http://paulirish.com/
 	*/
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = (function() {
			return (
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(
					/* function FrameRequestCallback */ callback,
					/* DOMElement Element */ element
				) {
					window.setTimeout(callback, 1000 / 60);
				}
			);
		})();
	}
	myGlobal.ready = false;
	// prepare init works
	// then wait start button push
	var songfile = "assets/zxmzf.mp3";

	song = new buzz.sound(songfile);

	window.addEventListener(
		"deviceorientation",
		function(event) {
			if (myGlobal.update) {
				myGlobal.a = event.alpha;
				myGlobal.b = event.beta;
				myGlobal.g = event.gamma;
			}
		},
		false
	);
	window.addEventListener("devicemotion", function(event) {
		if (myGlobal.update) {
			myGlobal.x = event.acceleration.x;
			myGlobal.y = event.acceleration.y;
			myGlobal.z = event.acceleration.z;

			// var ralpha = event.rotationRate.alpha;
			// var rbeta = event.rotationRate.beta;
			// var rgamma = event.rotationRate.gamma;

			// var interval = event.interval;
		}
	});
	// for debut only
	// start();
	document.getElementById("startBTN").addEventListener("click", start);
	myGlobal.ready = true;
}
function start() {
	if (myGlobal.ready) {
		console.log("start", song);

		song.play();
		tick();
	} else {
		console.log("not ready yet");
		alert("not ready yet");
	}
}

function tick() {
	myGlobal.tick += 1;

	// console.log("tick");
	if (myGlobal.tick % 2 === 0) {
		myGlobal.update = false;
		var deltaX = Math.abs(myGlobal.x - myGlobal.x0);
		var deltaY = Math.abs(myGlobal.y - myGlobal.y0);
		var deltaZ = Math.abs(myGlobal.z - myGlobal.z0);
		var deltaA = Math.abs(myGlobal.a - myGlobal.a0);
		var deltaB = Math.abs(myGlobal.b - myGlobal.b0);
		var deltaG = Math.abs(myGlobal.g - myGlobal.g0);

		myGlobal.x0 = myGlobal.x;
		myGlobal.y0 = myGlobal.y;
		myGlobal.z0 = myGlobal.z;
		myGlobal.a0 = myGlobal.a;
		myGlobal.b0 = myGlobal.b;
		myGlobal.g0 = myGlobal.g;

		myGlobal.update = true;
		myGlobal.delta = Math.max(
			...[deltaX, deltaY, deltaZ, deltaA, deltaB, deltaG]
		);
		// console.log(myGlobal.delta);
	}

	if (myGlobal.tick % 60 < 3) {
		if (myGlobal.delta < 5) {
			song.pause();
		} else {
			song.play();
		}
	}
	requestAnimationFrame(tick);
}

function updateDO(alpha, beta, gamma) {
	// console.log("updateDO");
	// console.log(alpha);
	// console.log(beta);
	// console.log(gamma);
	if (myGlobal.tick % 10 === 0) {
		myGlobal.doOld = myGlobal.doNew;
		myGlobal.doNew[0] = alpha;
		myGlobal.doNew[1] = beta;
		myGlobal.doNew[2] = gamma;
		console.log("do old ", myGlobal.doOld);
		console.log("do new ", myGlobal.doNew);
	}
}

function updateDM(x, y, z) {
	// console.log("updateDM");
	// console.log(x);
	// console.log(y);
	// console.log(z);
	if (myGlobal.tick % 10 === 0) {
		myGlobal.dmOld = myGlobal.dmNew;
		myGlobal.dmNew[0] = x;
		myGlobal.dmNew[1] = y;
		myGlobal.dmNew[2] = z;
		console.log("dm old ", myGlobal.dmOld);
		console.log("dm new ", myGlobal.dmNew);
	}
}

function noluck() {
	alert("noluck");
}
