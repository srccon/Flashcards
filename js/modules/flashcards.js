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
			$("#flashcards tr:not(.searchbar):visible").toggleClass("selected", checked);
		},

		// Select single
		"click #flashcards td": function(e) {

			if ($(e.currentTarget).parent().hasClass("searchbar")) { return; }

			var $checkbox = $(e.currentTarget).parent().find("input");
			var checked = $checkbox.is(":checked");

			$checkbox.prop("checked", !checked);
			$(e.currentTarget).parent().toggleClass("selected", !checked);
		},

		// Search
		"search|keyup .search-wrapper input": function(e) {

			var query = $(e.currentTarget).val().trim();
			if (!query) { $("#flashcards tr").show(); return; }

			$("#flashcards tr").each(function(i) {

				if (i < 2) { return true; }

				var front = $(this).find("td:eq(1)").text().trim().toLowerCase();
				var back = $(this).find("td:eq(2)").text().trim().toLowerCase();

				$(this).toggle((front.indexOf(query) == 0) || (back.indexOf(query) == 0));
			});
		},

		// Markdown info
		"click .button-markdown-info": function(e) {
			App.Utils.dialog("Markdown",
				"<table class='help-markdown'>" +
					"<tr><th>Description</th><th>Markdown</th><th>Result</th></tr>" +
					"<tr><td>Italic</td><td>*word*</td><td><i>word</i></td></tr>" +
					"<tr><td>Bold</td><td>**word**</td><td><b>word</b></td></tr>" +
					"<tr><td>Bold and italic</td><td>***word***</td><td><b><i>word</i></b></td></tr>" +
					"<tr><td>Furigana</td><td>[明日]{あした}</td><td><ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby></td></tr>" +
				"</table>"
			);
		},

		// New flashcard(s)
		"click .button-new-flashcard": function(e) {
			location.hash = "page-flashcard-new:" + App.Stacks.current;
		},

		// Add flashcard(s)
		"click .flashcard-add": function(e) {

			var data = {
				stackID: App.Stacks.current,
				front: App.Utils.escapeHTML($("#page-flashcard-new textarea[name=front]").val()),
				back: App.Utils.escapeHTML($("#page-flashcard-new textarea[name=back]").val())
			};

			if (!data.front.trim() || !data.back.trim())
			{ return App.Utils.notification("Front and/or back is empty"); }

			Flashcards.add(data);
		},

		// Remove flashcard(s)
		"click .flashcard-remove": function(e) {

			var keys = Flashcards.getSelection();

			App.Utils.dialog("Confirm", {
				content: "Remove selection?",
				buttons: {
					ok: function() { Flashcards.remove(keys); },
					cancel: true
				}
			});
		},

		// Edit flashcard(s)
		"click .flashcard-edit": function(e) {

			var keys = Flashcards.getSelection();
			location.hash = "page-flashcard-edit:" + App.Stacks.current + ":" + keys.shift();
			Flashcards.update.queue = keys;
		},

		// Move flashcard(s)
		"click .flashcard-move": function(e) {

			var $checkboxes = App.$("#page-stack #flashcards td input:checked");
			var stackname = App.$("#page-stack .stack-name").text().trim();

			if (!$checkboxes.length) { return App.Utils.notification("Nothing selected"); }

			App.Stacks.getAll(function(stacks) {

				var $select = $("<select></select>"), destination;

				[].forEach.call(stacks, function(v) {
					destination = v.value.category + " // " + v.value.name;
					if (destination == stackname)
					{ $select.append("<option data-key='" + v.key + "' selected='selected'>" + destination + "</option>"); }
					else
					{ $select.append("<option data-key='" + v.key + "'>" + destination + "</option>"); }
				});

				App.Utils.dialog("Select destination", {

					content: $select[0].outerHTML,
					buttons: {
						ok: Flashcards.move,
						cancel: true
					}
				});
			});
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

			var isFront = $(e.currentTarget).hasClass("front");
			var text = App.Router.$page.find("textarea[name=" + (isFront ? "front" : "back") + "]").val();

			Flashcards.translate(App.Stacks.current, text, isFront);
		},

		// Flashcard transition
		"click #flashcard .front": function(e) {

			var time_factor = 1;
			if (App._settings.disable_animation) { time_factor = 0; }

			$("#flashcard .front").transition({ rotateX: 180 }, 1000 * time_factor);
			$("#flashcard .back").transition({ rotateX: 365 }, 1000 * time_factor);
			$("#flashcard-shadow").transition({ rotateX: 180 }, 1000 * time_factor);

			$("#practice-buttons").delay(1000 * time_factor).fadeIn(500 * time_factor);
		},

		"click #flashcard .back": function(e) {

			var time_factor = 1;
			if (App._settings.disable_animation) { time_factor = 0; }

			$("#flashcard .front").transition({ rotateX: 5 }, 1000 * time_factor);
			$("#flashcard .back").transition({ rotateX: 180 }, 1000 * time_factor);
			$("#flashcard-shadow").transition({ rotateX: 0 }, 1000 * time_factor);
		}
	};

	/* ===================== */
	/* ====== GET ALL ====== */
	/* ===================== */

	Flashcards.getAll = function(stackID, callback, applyMarkdown) {
		App.DB.getData("App", "Flashcards", { index: "stackID", range: stackID }, function(data) {

			if (applyMarkdown) {
				data.forEach(function(v) {
					v.value.front = App.Utils.markdown(v.value.front);
					v.value.back = App.Utils.markdown(v.value.back);
				});
			}

			callback(data, stackID);
		});
	};

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Flashcards.get = function(key, callback, applyMarkdown) {
		App.DB.getData("App", "Flashcards", key, function(data) {

			if (applyMarkdown) {
				data.front = App.Utils.markdown(data.front);
				data.back = App.Utils.markdown(data.back);
			}

			callback(data);
		});
	};

	/* =========================== */
	/* ====== GET SELECTION ====== */
	/* =========================== */

	Flashcards.getSelection = function() {
		var $checkboxes = App.$("#flashcards td input:checked");
		var keys = [];

		if (!$checkboxes.length) { return App.Utils.notification("Nothing selected"); }

		$checkboxes.each(function() {
			var $parent = $(this).parents("tr");
			keys.push(+$parent.attr("data-key"));
		});

		return keys;
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

			App.Utils.notification("Flashcard added");
		});
	};

	/* ==================== */
	/* ====== UPDATE ====== */
	/* ==================== */

	Flashcards.update = function(key, newData) {

		App.DB.updateData("App", "Flashcards", key, newData, function() {

			if (Flashcards.update.queue && Flashcards.update.queue.length) {
				var key = Flashcards.update.queue.shift();
				location.hash = "page-flashcard-edit:" + App.Stacks.current + ":" + key;
				return;
			}

			window.location.hash = "#page-stack:" + App.Stacks.current;
		});
	};

	Flashcards.translate = function(stackID, text, isFront) {

		var prefs = App._settings.translation_preferences && App._settings.translation_preferences[stackID], from, to, url, $target;
		if (!prefs) { return App.Utils.notification("Please set your translation preferences in your stack settings first."); }

		$target = App.Router.$page.find("textarea[name=" + (isFront ? "back" : "front") + "]");
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

				if (App.$("#page-stack tr").length < 5) {
					$("#page-stack .note").show();
					App.$(".flashcard-actions-container").hide();
				}
			}
			
			count++;
		};

		// Remove key(s)
		keys.forEach(function(key) {
			App.DB.removeData("App", "Flashcards", key, function() { fn(key); });
		});
	};

	/* ================== */
	/* ====== MOVE ====== */
	/* ================== */

	Flashcards.move = function() {

		var destination = $("#dialog select option:selected").text();
		var stackID = +$("#dialog select option:selected").attr("data-key");
		var $checkboxes = App.$("#page-stack #flashcards td input:checked");
		var keys = Flashcards.getSelection();

		App.DB.updateData("App", "Flashcards", {

				index: "stackID",
				range: App.Stacks.current,
				keys: keys

			}, { stackID: stackID },

			function(e) {
				$checkboxes.parents("tr").remove();

				if (App.$("#page-stack tr").length < 5) {
					$("#page-stack .note").show();
					App.$(".flashcard-actions-container").hide();
				}

				App.Utils.notification("Moved " + keys.length + " flashcards to " + destination);
			}
		);
	};

	return Flashcards;
});