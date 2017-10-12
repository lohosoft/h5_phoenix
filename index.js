console.log("index.js");
var myGlobal = {};

window.onload = init;
function init() {
	if (!window.DeviceOrientationEvent && !window.DeviceMotion) {
		noluck();
	} else {
		prepare();
	}
}

function prepare() {
	myGlobal.ready = false;
	// prepare init works
	// then wait start button push
	myGlobal.songfile = "assets/zxmzf.mp3";

	myGlobal.song = new buzz.sound(myGlobal.songfile);

	myGlobal.doOld = [0, 0, 0];
	myGlobal.doNew = [0, 0, 0];
	myGlobal.dmOld = [0, 0, 0];
	myGlobal.dmNew = [0, 0, 0];
	window.addEventListener(
		"deviceorientation",
		function(event) {
			var alpha = event.alpha;
			var beta = event.beta;
			var gamma = event.gamma;
			updateDO(alpha, beta, gamma);
		},
		false
	);
	window.addEventListener("devicemotion", function(event) {
		var x = event.acceleration.x;
		var y = event.acceleration.y;
		var z = event.acceleration.z;

		// var ralpha = event.rotationRate.alpha;
		// var rbeta = event.rotationRate.beta;
		// var rgamma = event.rotationRate.gamma;

		// var interval = event.interval;
		updateDM(x, y, z);
	});
	myGlobal.ready = true;
}
function start() {
	if (myGlobal.ready) {
		tick();
	} else {
		console.log("not ready yet");
		alert("not ready yet");
	}
}

function tick() {}
function updateDO(alpha, beta, gamma) {
	myGlobal.doOld = myGlobal.doNew;
	myGlobal.doNew[0] = alpha;
	myGlobal.doNew[1] = beta;
	myGlobal.doNew[2] = gamma;
}

function updateDM(x, y, z) {
	myGlobal.dmOld = myGlobal.dmNew;
	myGlobal.dmNew[0] = x;
	myGlobal.dmNew[1] = y;
	myGlobal.dmNew[2] = z;
}

function noluck() {
	alert("noluck");
}
