define(function() {

	var Utils = {}, App;
	
	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Utils.initialize = function() {

		App = require("app");
	};

	/* ========================== */
	/* ====== LOCALSTORAGE ====== */
	/* ========================== */

	Utils.localStorage = function(key, value) {
		if (key !== undefined && value !== undefined) {
			// Phonegap hack ?
			window.localStorage.removeItem(key);
			window.localStorage.setItem(key, JSON.stringify(value));
		} else if (key !== undefined) {
			return JSON.parse(window.localStorage.getItem(key));
		}
	};

	/* ========================= */
	/* ====== ESCAPE HTML ====== */
	/* ========================= */

	Utils.escapeHTML = function(str) {
		return str
		  .replace(/&/g, "&amp;")
		  .replace(/</g, "&lt;")
		  .replace(/>/g, "&gt;")
		  .replace(/"/g, "&quot;")
		  .replace(/'/g, "&#039;");
	};

	/* =========================== */
	/* ====== ARRAY SHUFFLE ====== */
	/* =========================== */

	Utils.array_shuffle = function(arr) {
		var count = arr.length, temp, index;

		while (count--) {
			index = (Math.random() * count) | 0;
			temp = arr[count];
			arr[count] = arr[index];
			arr[index] = temp;
		}

		return arr;
	};

	return Utils;
});