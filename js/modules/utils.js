define(function() {

	var Utils = {}, App;
	
	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Utils.initialize = function() {

		App = require("app");
	};

	/* ======================== */
	/* ====== FAKE CLICK ====== */
	/* ======================== */

	Utils.fake_click = function (anchor) {

		if (anchor.click) {
			anchor.click();
		} else if (document.createEvent) {
			if (event.target !== anchor) {
				var evt = document.createEvent("MouseEvents"); 
				evt.initMouseEvent("click", true, true, window, 
				0, 0, 0, 0, 0, false, false, false, false, 0, null); 
				var allowDefault = anchor.dispatchEvent(evt);
			}
		}
	};

	Object.defineProperty(Array.prototype, "shuffle", {
		value:  function() {
			var counter = this.length, temp, index;

			// While there are elements in the array
			while (counter--) {
				// Pick a random index
				index = (Math.random() * counter) | 0;

				// And swap the last element with it
				temp = this[counter];
				this[counter] = this[index];
				this[index] = temp;
			}

			return this;
		},

		enumerable: false,
		configureable: false,
		writeable: false
	});

	return Utils;
})