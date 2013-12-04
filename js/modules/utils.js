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

	/* ========================== */
	/* ====== NOTIFICATION ====== */
	/* ========================== */

	Utils.notification = function(str, duration) {
		if (!duration) { duration = 2000; }

		var $notification = App.$("#notification");

		if (!$notification.length) {
			$("body").append("<div id='notification'></div>");
			$notification = App.$("#notification");
		}

		$notification.html(str).css({
			opacity: 0,
			display: "inline-block"
		});

		$notification.css({
			top: $(window).height() - $notification.height()*4,
			left: $(window).width()/2 - $notification.width()/2
		});

		$notification.stop(true, true).finish(true, true).animate({
			opacity: 1
		}).delay(duration).fadeOut();
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