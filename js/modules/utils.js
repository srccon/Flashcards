define(function() {

	var Utils = {}, App;
	
	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Utils.initialize = function() {

		App = require("app");

		$(window).on("resize", function(e) {

			var $notification = $("#notification");
			if (!$notification.length) { return; }

			$notification.css({
				top: $(window).height() - $notification[0].offsetHeight*2,
				left: $(window).width()/2 - $notification[0].offsetWidth/2
			});
		});

		// Utils.dialog("Hallo Welt", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
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

	/* ==================== */
	/* ====== DIALOG ====== */
	/* ==================== */

	Utils.dialog = function(title, content) {

		var $dialog = App.$("#dialog");

		if (!$dialog.length) {
			$("body").append("<div id='dialog'><div class='title'></div><div class='content'></div></div>");
			$("body").append("<div id='dialog-modal'>");
			$dialog = App.$("#dialog");
		}

		$dialog.find(".title").html(title);
		$dialog.find(".content").html(content);

		$dialog.css({
			top: $(window).height()/2 - $dialog.height()/2,
			left: $(window).width()/2 - $dialog.width()/2
		}).show();

		$("#dialog-modal").show();
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
			top: $(window).height() - $notification[0].offsetHeight*2,
			left: $(window).width()/2 - $notification[0].offsetWidth/2
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

	/* ========================== */
	/* ====== FORCE RENDER ====== */
	/* ========================== */

	Utils.forceRender = function($elem) {
		$elem.hide();
		$elem[0].offsetHeight;
		$elem.show();
	};

	/* ====================== */
	/* ====== MARKDOWN ====== */
	/* ====================== */

	Utils.markdown = function(str) {

		// Ruby tags: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby

		return str
		  .replace(/\[([^}]+)\]{([^{]+)}/g, "<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>")
		  .replace(/([^}]+){([^{]+)}/g, "<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>")
		  .replace(/\*\*\*(.+)\*\*\*/g, "<b><i>$1</i></b>")
		  .replace(/\*\*(.+)\*\*/g, "<b>$1</b>")
		  .replace(/\*(.+)\*/g, "<i>$1</i>");
	};

	return Utils;
});