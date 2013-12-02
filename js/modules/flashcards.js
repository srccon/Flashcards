define(["transit"], function() {

	var Flashcards = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Flashcards.initialize = function() {

		App = require("app");
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Flashcards.events = {

		// Select all
		"click #flashcards input[name=select_all]": function(e) {
			var checked = $(e.currentTarget).is(":checked");
			$("#flashcards input[type=checkbox]").prop("checked", checked);
		},

		// New flashcard(s)
		"click #flashcard-new": function(e) {
			var stackID = +window.location.hash.split(":")[1];
			location.hash = "page-flashcard-new:" + stackID;
		},

		// Add flashcard(s)
		"click .flashcard-add": function(e) {

			var data = {
				stackID: +window.location.hash.split(":")[1],
				front: App.Utils.escapeHTML($("#page-flashcard-new textarea[name=front]").val()),
				back: App.Utils.escapeHTML($("#page-flashcard-new textarea[name=back]").val())
			};

			Flashcards.add(data);
		},

		// Move flashcard(s)
		"click .flashcard-move": function(e) {

			var $checkboxes = App.$("#page-stack #flashcards td input:checked");
			var keys = [];

			$checkboxes.each(function() {
				var $parent = $(this).parents("tr");
				keys.push(+$parent.attr("data-key"));
			});

			if (!keys.length) { return alert("Make a selection first!"); }

			alert("Not available yet!");
		},
		// Remove flashcard(s)
		"click .flashcard-remove": function(e) {

			var $checkboxes = App.$("#page-stack #flashcards td input:checked");
			var keys = [];

			$checkboxes.each(function() {
				var $parent = $(this).parents("tr");
				keys.push(+$parent.attr("data-key"));
			});

			if (!keys.length) { return alert("Make a selection first!"); }

			if (confirm("Remove selection?"))
			{ Flashcards.remove(keys); }
		},

		// Edit flashcard(s)
		"click .flashcard-edit": function(e) {

			var stackID = +window.location.hash.split(":")[1];
			var $checkboxes = App.$("#page-stack #flashcards td input:checked");
			var keys = [];

			$checkboxes.each(function() {
				var $parent = $(this).parents("tr");
				keys.push(+$parent.attr("data-key"));
			});

			if (!keys.length) { return alert("Make a selection first!"); }

			location.hash = "page-flashcard-edit:" + stackID + ":" + keys.shift();
			Flashcards.update.queue = keys;
		},

		// Update flashcard(s)
		"click .flashcard-update": function(e) {

			var key = +window.location.hash.split(":")[2];

			var data = {
				front: $("#page-flashcard-edit textarea[name=front]").val(),
				back: $("#page-flashcard-edit textarea[name=back]").val()
			};

			Flashcards.update(key, data);
		},

		// Translate flashcard
		"click .translate": function(e) {

			var stackID = +window.location.hash.split(":")[1];
			var isFront = $(e.currentTarget).hasClass("front");
			var text = $("#page-flashcard-new textarea[name=" + (isFront ? "front" : "back") + "]").val();

			Flashcards.translate(stackID, text, isFront);
		},

		// Flashcard transition
		"click #flashcard .front": function(e) {

			$("#flashcard .front").transition({ rotateX: 180 }, 1000);
			$("#flashcard .back").transition({ rotateX: 365 }, 1000);
			$("#flashcard-shadow").transition({ rotateX: 180 }, 1000);

			$("#practice-buttons").delay(1000).fadeIn(500);
		},

		"click #flashcard .back": function(e) {

			$("#flashcard .front").transition({ rotateX: 5 }, 1000);
			$("#flashcard .back").transition({ rotateX: 180 }, 1000);
			$("#flashcard-shadow").transition({ rotateX: 0 }, 1000);
		},

		// Practice buttons
		"click #practice-buttons .button": function(e) {

			if ($(e.currentTarget).hasClass("green"))
			{ App.Stacks.practice.score++; }

			App.Stacks.practice();
		}
	};

	/* ===================== */
	/* ====== GET ALL ====== */
	/* ===================== */

	Flashcards.getAll = function(stackID, callback) {
		App.DB.getData("App", "Flashcards", ["stackID", stackID], function(data) {
			callback(data, stackID);
		});
	};

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Flashcards.get = function(key, callback) {
		App.DB.getData("App", "Flashcards", key, callback);
	};

	/* ================= */
	/* ====== ADD ====== */
	/* ================= */

	Flashcards.add = function(data, callback) {

		// Add key(s)
		App.DB.addData("App", "Flashcards", data, function(e) {

			if (callback) { callback(); }
			if (data.length) { return; }
			
			App.$("#page-flashcard-new textarea[name=front]").val("");
			App.$("#page-flashcard-new textarea[name=back]").val("");
		});
	};

	/* ==================== */
	/* ====== UPDATE ====== */
	/* ==================== */

	Flashcards.update = function(key, newData) {

		App.DB.updateData("App", "Flashcards", key, newData, function() {

			var stackID = +window.location.hash.split(":")[1];

			if (Flashcards.update.queue && Flashcards.update.queue.length) {
				var key = Flashcards.update.queue.shift();
				location.hash = "page-flashcard-edit:" + stackID + ":" + key;
				return;
			}

			window.location.hash = "#page-stack:" + stackID;
		});
	};

	Flashcards.translate = function(stackID, text, isFront) {

		var prefs = App._settings.translation_preferences && App._settings.translation_preferences[stackID], from, to, url, $target;
		if (!prefs) { return alert("Please set your translation preferences in your stack settings first."); }

		$target = App.$("#page-flashcard-new textarea[name=" + (isFront ? "back" : "front") + "]");
		$target.val("translating ...");

		from = prefs.from;
		to = prefs.to;

		// Switch
		if (!isFront) { from = prefs.to; to = prefs.from; }

		url = "http://mymemory.translated.net/api/get?q=" + encodeURIComponent(text) + "&langpair=" + from + "|" + to + "&de=elias.schuett@gmail.com";

		App.$.getJSON(url, function(data) {
			var translation = data.responseData.translatedText;
			$target.val(translation);
		});
	};

	Flashcards.translate.languages = ["Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Azerbaijani", "Bajan", "Balkan Gipsy", "Basque", "Bemba", "Bengali", "Bielarus", "Bislama", "Bosnian", "Breton", "Bulgarian", "Burmese", "Catalan", "Cebuano", "Chamorro", "Chinese (Simplified)", "Chinese Traditional", "Comorian (Ngazidja)", "Coptic", "Croatian", "Czech", "Danish", "Dutch", "Dzongkha", "English", "Esperanto", "Estonian", "Fanagalo", "Faroese", "Finnish", "French", "Galician", "Georgian", "German", "Greek", "Greek (Classical)", "Gujarati", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian", "Inuktitut (Greenlandic)", "Irish Gaelic", "Italian", "Japanese", "Javanese", "Kabuverdianu", "Kabylian", "Kannada", "Kazakh", "Khmer", "Kinyarwanda", "Kirundi", "Korean", "Kurdish", "Kurdish Sorani", "Kyrgyz", "Lao", "Latin", "Latvian", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malay", "Maldivian", "Maltese", "Manx Gaelic", "Maori", "Marshallese", "Mende", "Mongolian", "Morisyen", "Nepali", "Niuean", "Norwegian", "Nyanja", "Pakistani", "Palauan", "Panjabi", "Papiamentu", "Pashto", "Persian", "Pijin", "Polish", "Portuguese", "Potawatomi", "Quechua", "Romanian", "Russian", "Samoan", "Sango", "Scots Gaelic", "Serbian", "Shona", "Sinhala", "Slovak", "Slovenian", "Somali", "Sotho, Southern", "Spanish", "Sranan Tongo", "Swahili", "Swedish", "Swiss German", "Syriac (Aramaic)", "Tagalog", "Tajik", "Tamashek (Tuareg)", "Tamil", "Telugu", "Tetum", "Thai", "Tibetan", "Tigrinya", "Tok Pisin", "Tokelauan", "Tongan", "Tswana", "Turkish", "Turkmen", "Tuvaluan", "Ukrainian", "Uma", "Uzbek", "Vietnamese", "Wallisian", "Welsh", "Wolof", "Xhosa", "Yiddish", "Zulu"];
	Flashcards.translate.language_codes = ["af-ZA", "sq-AL", "am-AM", "ar-SA", "hy-AM", "az-AZ", "bjs-BJS", "rm-RO", "eu-ES", "bem-BEM", "bn-IN", "be-BY", "bi-BI", "bs-BA", "br-FR", "bg-BG", "my-MM", "ca-ES", "cb-PH", "ch-CH", "zh-CN", "zh-TW", "zdj-ZDJ", "cop-XNA", "hr-HR", "cs-CZ", "da-DK", "nl-NL", "dz-DZ", "en-GB", "eo-XN", "et-EE", "fn-FNG", "fo-FO", "fi-FI", "fr-FR", "gl-ES", "ka-GE", "de-DE", "el-GR", "XN-GR", "gu-IN", "ha-HA", "XN-US", "he-IL", "hi-IN", "hu-HU", "is-IS", "id-ID", "kl-KL", "ga-IE", "it-IT", "ja-JA", "jw-ID", "kea-KEA", "kab-DZ", "ka-IN", "kk-KZ", "km-KM", "rw-RW", "rn-RN", "ko-KR", "ku-TR", "ku-TR", "ky-KY", "lo-LO", "la-XN", "lv-LV", "lt-LT", "lb-LB", "mk-MK", "mg-MG", "ms-MY", "dv-DV", "mt-MT", "gv-IM", "mi-NZ", "mh-MH", "men-MEN", "mn-MN", "mfe-MFE", "ne-NP", "niu-NIU", "no-NO", "ny-NY", "ur-PK", "pau-PAU", "pa-IN", "pap-PAP", "ps-PK", "fa-IR", "pis-PIS", "pl-PL", "pt-PT", "pot-US", "qu-XN", "ro-RO", "ru-RU", "sm-SM", "sg-SG", "gd-GB", "sr-RS", "sn-SN", "si-LK", "sk-SK", "sl-SI", "so-SO", "st-ST", "es-ES", "srn-SRN", "sw-SZ", "sv-SE", "de-CH", "syc-TR", "tl-PH", "tg-TJ", "tmh-DZ", "ta-LK", "te-IN", "tet-TET", "th-TH", "bo-CN", "ti-TI", "tpi-TPI", "tkl-TKL", "to-TO", "tn-TN", "tr-TR", "tk-TK", "tvl-TVL", "uk-UA", "ppk-ID", "uz-UZ", "vi-VN", "wls-WLS", "cy-GB", "wo-SN", "xh-ZA", "yi-YD", "zu-ZU"];

	/* ==================== */
	/* ====== REMOVE ====== */
	/* ==================== */

	Flashcards.remove = function(key, no_UI) {

		var keys = typeof key == "object" && key.length ? key : [key], count = 0;
		var fn = function(key) {

			if (!no_UI) {
				App.$("#page-stack tr[data-key=" + key + "]").remove();

				if (App.$("#page-stack tr").length < 3) {
					$("#page-stack .note").show();
					App.$("#flashcards, #page-stack .actions").hide();
				}
			}
			
			count++;
		};

		// Remove key(s)
		keys.forEach(function(key) {
			App.DB.removeData("App", "Flashcards", key, function() { fn(key); });
		});
	};

	return Flashcards;
});