/*global window, document */
// Tested browsers: FF/CHROME/IE7
// Inline CSS isn't welcome, only for this task.

(function (global, document, undef) {
	"use strict";
	//initialize objects
	var vars = {}, api = {};
	// get the wrapper element
	vars.scene = document.getElementById("scene");

	/**
	* Creates rectangle
	*
	* @method getRectangle
	* @param {Numeric} Rectangle's width
	* @param {Numeric} Rectangle's height
	* @param {String} Rectangle's color
	* @return {Object} Returns rectangle (DOM object)
	*/
	api.getRectangle = function (a, b, color) {
		var div = document.createElement("div");
		div.style.position = "relative";
		div.style.width = a + "px";
		div.style.height = b + "px";
		div.style.display = "inline-block";
		div.style.textAlign = "left";
		div.style.verticalAlign = "top";
		div.style.backgroundColor = color;
		return div;
	};

	/**
	* Creates button
	*
	* @method getButton
	* @param {String} Button's text
	* @return {Object} Returns button (DOM object)
	*/
	api.getButton = function (text) {
		var btn = document.createElement("button"),
			t = document.createTextNode(text || "Go");
		btn.appendChild(t);
		btn.style.position = "absolute";
		btn.style.bottom = "0";
		btn.style.left = "50%";
		btn.style.width = "100px";
		btn.style.marginLeft = "-" + parseInt(btn.style.width, 10) / 2 + "px";
		return btn;
	};

	// Create blue 400/400px rectangle
	vars.rectBlue = api.getRectangle(400, 400, "#3366FF");
	// Create red 100/100px rectangle 
	vars.rectRed = api.getRectangle(100, 100, "#FF5050");
	// Create a Button
	vars.button = api.getButton("Start!");
	// Add blue rectangle to the scene
	vars.scene.appendChild(vars.rectBlue);
	// Add red rectangle to the blue one
	vars.rectBlue.appendChild(vars.rectRed);
	// Add button to the blue rectangle
	vars.rectBlue.appendChild(vars.button);

	/**
	* Cross-browser event binder
	*
	* @method getButton
	* @param {Object} element to bind
	* @param {String} event name
	* @param {Function} event handler
	*/
	api.bind = function (el, e, eHandler) {
		if (el.addEventListener) {
			el.addEventListener(e, eHandler, false);
		} else if (el.attachEvent) {
			el.attachEvent('on' + e, eHandler);
		}
	};
	// Bind onclick event to the button
	api.bind(vars.button, 'click', function () {
		api.animate(vars.rectBlue, vars.rectRed);
	});

	/**
	* Generic animate function
	*
	* @param {Object} parent block
	* @param {Object} inner block
	*/
	api.animate = function (parentBox, innerBox) {
		var parentBoxBounding = parentBox.getBoundingClientRect(),
			innerBoxBounding = innerBox.getBoundingClientRect(),
			i = 0,
			t,
			browser = (innerBox.style.transform !== undef
						|| innerBox.style["-webkit-transform"] !== undef) ? true : false;
		//disable button while animating
		vars.button.disabled = true;
		t = global.setInterval(function () { //no transform support - repainting occurs
			if (!browser && innerBoxBounding.bottom < parentBoxBounding.bottom
					&& innerBoxBounding.right < parentBoxBounding.right) {
				innerBox.style.backgroundColor = "red";
				innerBox.style.bottom = -i + "px";
				innerBox.style.right =  -i + "px";
				parentBoxBounding = parentBox.getBoundingClientRect();
				innerBoxBounding = innerBox.getBoundingClientRect();
				i += 1;
			} else if (browser && i <= (parseInt(parentBox.style.width, 10) - parseInt(innerBox.style.width, 10))
					&& i <= (parseInt(parentBox.style.width, 10) - parseInt(innerBox.style.width, 10))) {
				innerBox.style.backgroundColor = "green";
				innerBox.style["-webkit-transform"] = "translate(" + i + "px, " + i + "px)";
				innerBox.style.transform = "translate(" + i + "px, " + i + "px)";
				i += 1;
			} else {
				global.clearInterval(t);
				vars.button.disabled = false; //enable button when finish animating
			}
		}, 10);
	};
}(window, document));
