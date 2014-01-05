define(function() {

	var Utils = {}, App;
	
	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Utils.initialize = function() {

		App = require("app");

		$(window).on("resize", function(e) {

			var $notification = $("#notification");

			if ($notification.length) {
				$notification.css({
					top: $(window).height() - $notification[0].offsetHeight*2,
					left: $(window).width()/2 - $notification[0].offsetWidth/2
				});
			}

			var $dialog = $("#dialog");

			if ($dialog.length) {
				$dialog.css({
					top: $(window).height()/2 - $dialog.height()/2,
					left: $(window).width()/2 - $dialog.width()/2,
					width: $("body").width() / 100 * 70
				});
			}
		});
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Utils.events = {
		"click #dialog .close, #dialog-modal, #dialog input[type=button]": function() {
			$("#dialog, #dialog-modal").hide();
			Utils.dialog.onclose && Utils.dialog.onclose();
		}
	};

	/* ================== */
	/* ====== RAND ====== */
	/* ================== */

	Utils.rand = function(min, max, toFloat) {
		var random = Math.random() * (max-min) + min;
		return toFloat ? random : Math.round(random);
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
	/* ====== UNESCAPE HTML ====== */
	/* =========================== */

	Utils.unescapeHTML = function(str) {
		return str
		  .replace(/&amp;/g, "&")
		  .replace(/&lt;/g, "<")
		  .replace(/&gt;/g, ">")
		  .replace(/&quot;/g, "\"")
		  .replace(/&#039;/g, "'");
	};

	/* ==================== */
	/* ====== DIALOG ====== */
	/* ==================== */

	Utils.dialog = function(title, content, onclose) {

		var $dialog = App.$("#dialog"), $input, $btn_ok;

		if (!$dialog.length) {

			$("body").append(
				"<div id='dialog'>" +
					"<span class='close fa fa-times'></span>" +
					"<div class='title'></div>" +
					"<div class='content'></div>" +
					"<div class='buttons'>" +
						"<input type='button' class='button' name='dialog-ok' value='ok'>" +
						"<input type='button' class='button' name='dialog-cancel' value='cancel'>" +
					"</div>" +
				"</div>"
			);

			$("body").append("<div id='dialog-modal'>");
			$dialog = App.$("#dialog");
		}

		$dialog.find(".title").html(title);
		$dialog.find(".content").html("");
		$dialog.find(".buttons").toggle(!!content.buttons);

		if (typeof content == "string") {

			$dialog.find(".content").html(content);

		} else {

			if (content.content) { $dialog.find(".content").html(content.content); }

			if (content.buttons) {

				$btn_ok = $dialog.find(".buttons input[name='dialog-ok']");
				$btn_ok.off("click").on("click", content.buttons.ok);
				$btn_ok.toggle(!!content.buttons.ok);

				$dialog.find(".buttons input[name='dialog-cancel']").toggle(!!content.buttons.cancel);
				$dialog.find(".buttons").show();
			}

			if (content.input) {

				$input = $("<input type='text'>");

				$input.attr({
					name: content.input.name,
					value: content.input.value || ""
				});

				if (content.input.placeholder)
				{ $input.attr("placeholder", content.input.placeholder); }

				$dialog.find(".content").append($input);
			}
		}

		var width = $("body").width() / 100 * 70;

		$dialog.css({
			top: $(window).height()/2 - $dialog.height()/2,
			left: $(window).width()/2 - width/2,
			width: width
		}).show();

		Utils.dialog.onclose = onclose;

		$("#dialog-modal").show();
		if ($input && content.input && content.input.focus) { $input.focus(); }
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

	Utils.markdown = function(str, remove) {

		// Ruby tags: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby

		return str
		  .replace(/\[([^}]+)\]{([^{]+)}/g, remove ? "$1" : "<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>")
		  .replace(/([^}]+){([^{]+)}/g, remove ? "$1" : "<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>")
		  .replace(/\*\*\*(.+)\*\*\*/g, remove ? "$1" : "<b><i>$1</i></b>")
		  .replace(/\*\*(.+)\*\*/g, remove ? "$1" : "<b>$1</b>")
		  .replace(/\*(.+)\*/g, remove ? "$1" : "<i>$1</i>");
	};

	/* ============================= */
	/* ====== TRANSLATE RANGE ====== */
	/* ============================= */

	Utils.translateRange = function(val, a0, b0, a1, b1) {
		return ((val-a0)/(b0-a0)) * (b1-a1) + a1
	};

	/* =================== */
	/* ====== SPEAK ====== */
	/* =================== */

	Utils.speak = function(text, langCode, callback) {
		
		if (!(window.speechSynthesis || window.SpeechSynthesisUtterance))
		{ return callback && callback(); }
		
		var u = new window.SpeechSynthesisUtterance();
		
		u.text = Utils.unescapeHTML(text);
		u.lang = langCode;
		u.rate = 1.0;

		if (callback) { u.onend = callback; }
		window.speechSynthesis.speak(u);
	};

	return Utils;
});