console.log("index.js");

import GyroNorm from "gyronorm";
const myGlobal = {};
myGlobal.songfile = "assets/zxmzf.mp3";
window.onload = init;
function init() {
	myGlobal.song = new buzz.sound(songfile);

	myGlobal.gn = new GyroNorm();

	mhGlobal.gn
		.init()
		.then(function() {
			gn.start(function(data) {
				// console.log(JSON.stringify(data));
				// infoDiv1.innerHTML = "<p>" + JSON.stringify(data) + "</p>";
				// Process:
				// data.do.alpha	( deviceorientation event alpha value )
				// data.do.beta		( deviceorientation event beta value )
				// data.do.gamma	( deviceorientation event gamma value )
				// data.do.absolute	( deviceorientation event absolute value )
				// data.dm.x		( devicemotion event acceleration x value )
				// data.dm.y		( devicemotion event acceleration y value )
				// data.dm.z		( devicemotion event acceleration z value )
				// data.dm.gx		( devicemotion event accelerationIncludingGravity x value )
				// data.dm.gy		( devicemotion event accelerationIncludingGravity y value )
				// data.dm.gz		( devicemotion event accelerationIncludingGravity z value )
				// data.dm.alpha	( devicemotion event rotationRate alpha value )
				// data.dm.beta		( devicemotion event rotationRate beta value )
				// data.dm.gamma	( devicemotion event rotationRate gamma value )
			});
		})
		.catch(function(e) {
			// Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
			// alert('not support your device yet')
			window.addEventListener("deviceorientation", function(e) {
				// infoDiv1.innerHTML = "<p>" + JSON.stringify(e) + "</p>";
			});
			window.addEventListener("devicemotion", function(e) {
				// infoDiv2.innerHTML = "<p>" + JSON.stringify(e) + "</p>";
			});
		});
	function start() {
		song.play();
		song.loop();
	}
}
