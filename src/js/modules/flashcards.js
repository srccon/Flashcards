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
		"click .flashcards input[name=select_all]": function(e) {
			var checked = App.$(e.currentTarget).is(":checked");
			App.$(".flashcards input[type=checkbox]").prop("checked", checked);
			App.$(".flashcards tr:not(.searchbar):visible").toggleClass("selected", checked);
		},

		// Select single
		"click .flashcards td": function(e) {

			if ($(e.currentTarget).parent().hasClass("searchbar")) { return; }

			var $checkbox = App.$(e.currentTarget).parent().find("input");
			var checked = $checkbox.is(":checked");

			$checkbox.prop("checked", !checked);
			App.$(e.currentTarget).parent().toggleClass("selected", !checked);
		},

		// Search
		"search|keyup .search-wrapper input": function(e) {

			Flashcards.search($(e.currentTarget).val().trim());
		},

		// Markdown info
		"click .button-markdown-info": function(e) {
			App.Utils.dialog("Markdown",
				"<table class='help'>" +
					"<tr><th>Description</th><th>Markdown</th><th>Result</th></tr>" +
					"<tr><td>Italic</td><td>*word*</td><td><i>word</i></td></tr>" +
					"<tr><td>Bold</td><td>**word**</td><td><b>word</b></td></tr>" +
					"<tr><td>Bold and italic</td><td>***word***</td><td><b><i>word</i></b></td></tr>" +
					"<tr><td>Furigana</td><td>[明日]{あした}</td><td><ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby></td></tr>" +
				"</table>"
			);
		},

		// Search info
		"click .button-search-info": function(e) {
			App.Utils.dialog("Search",
				"More specific queries require a special syntax:<br><br>"+
				"<ul>" +
					"<li><b>category:</b>value</li>" +
					"<li><b>stack:</b>value</li>" +
					"<li><b>front:</b>value</li>" +
					"<li><b>back:</b>value</li>" +
					"<li><b>tags:</b>value</li>" +
					"<li><b>score_front:</b>[n, &gt;n, &lt;n]</li>" +
					"<li><b>score_back:</b>[n, &gt;n, &lt;n]</li>" +
				"</ul><br>" +

				"Most of the keywords should be pretty self explanatory. It is important to not use spaces between the keyword and the search value." +
				"If you must use spaces, wrap them in quotes.<br><br>" +

				"<b>score_front</b> and <b>score_back</b> are used to filter flashcards by their score (indicated by the number in front of their value). " +
				"You can either search for an exact score, or for a score lesser/greater a number using &lt; and &gt;.<br><br>" +

				"To search for multiple categories or stacks, seperate them with two pipe symbols (||), tags however use a comma for seperation.<br><br>" +
				"An example query could look like this:<br><b>stack:\"Lorem Ipsum\"||Dolor tags:foo,bar</b><br><br>" +
				"Note that we have to seperate each syntax:value pair with a space. The above example would search for all flashcards contained in a stack named <b>Lorem Ipsum</b> or <b>Dolor</b> with either <b>foo</b> or <b>bar</b> as a tag."
			);
		},

		// New flashcard(s)
		"click .button-new-flashcard": function(e) {
			window.location.hash = "page-flashcard-new:" + App.Stacks.current;
		},

		// Add flashcard(s)
		"click .flashcard-add": function(e) {

			var data = {
				stackID: App.Stacks.current,
				front: App.Utils.escapeHTML(App.Router.$page.find("textarea[name=front]").val()),
				back: App.Utils.escapeHTML(App.Router.$page.find("textarea[name=back]").val()),
				tags: JSON.stringify(App.Utils.escapeHTML(App.Router.$page.find("input[name=tags]").val()).split(/ ?, ?/g))
			};

			if (!data.front.trim() || !data.back.trim())
			{ return App.Utils.notification("Front and/or back is empty"); }

			Flashcards.add(data);
		},

		// Flashcard info
		"click .flashcard-info": function(e) {

			var cards = Flashcards.getSelection();
			if (!cards.length) { return App.Utils.notification("Nothing selected"); }

			Flashcards.get(cards.map(function(v) { return v.key; }), function(data) {

				var html ="<table class='flashcard-info-table'><tr><th>Front</th><th>Back</th><tr>";

				data.forEach(function(v) {
					var s = v.value.score || {front:{yes:0,no:0},back:{yes:0,no:0}};
					if (typeof s == "string") { s = JSON.parse(s); }

					html += "<tr>";
					html += "<td>[" + s.front.yes + ";" + s.front.no + "] " + v.value.front + "</td>";
					html += "<td>[" + s.back.yes + ";" + s.back.no + "] " + v.value.back + "</td>";
					html += "</tr>";
				});

				html += "</table><hr>";
				html += "The first number inside each bracket represents the amount of times you pressed the \"thumbs-up\"-button, ";
				html += "the second one the opposite.<br><br>The numbers displayed behind this window represent the difference between the two (thumbs-up minus thumbs-down).";

				App.Utils.dialog("Flashcard Info", html);
			});
		},


		// Remove flashcard(s)
		"click .flashcard-remove": function(e) {

			var cards = Flashcards.getSelection();
			if (!cards.length) { return App.Utils.notification("Nothing selected"); }

			App.Utils.dialog("Confirm", {
				content: "Remove selection?",
				buttons: {
					ok: function() { Flashcards.remove(cards); },
					cancel: true
				}
			});
		},

		// Edit flashcard(s)
		"click .flashcard-edit": function(e) {

			var cards = Flashcards.getSelection(), card;
			if (!cards.length) { return App.Utils.notification("Nothing selected"); }

			card = cards.shift();

			Flashcards.update.origin = window.location.hash.substr(1);
			window.location.hash = "page-flashcard-edit:" + card.stackID + ":" + card.key;
			Flashcards.update.queue = cards;
		},

		// Move flashcard(s)
		"click .flashcard-move": function(e) {

			var $checkboxes = App.Router.$page.find(".flashcards td input:checked");
			var stackname = App.Router.$page.find(".stack-name").text().trim();

			if (!$checkboxes.length) { return App.Utils.notification("Nothing selected"); }

			App.Stacks.getAll(function(stacks) {

				var $select = App.$("<select></select>"), destination;

				[].forEach.call(stacks, function(v) {
					if (v.key == App.Stacks.current) { return true; }
					destination = v.value.category + " // " + v.value.name;
					$select.append("<option data-key='" + v.key + "'>" + destination + "</option>");
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
				front: App.Router.$page.find("textarea[name=front]").val(),
				back: App.Router.$page.find("textarea[name=back]").val(),
				tags: JSON.stringify(App.Utils.escapeHTML(App.Router.$page.find("input[name=tags]").val()).split(/ ?, ?/g))
			};

			Flashcards.update(key, data);
		},

		// Translate flashcard
		"click .translate": function(e) {

			var isFront = App.$(e.currentTarget).hasClass("front");
			var text = App.Router.$page.find("textarea[name=" + (isFront ? "front" : "back") + "]").val();

			if (!text.trim()) { return; }

			if (App.isOnline()) {
				Flashcards.translate(App.Stacks.current, text, isFront);
			} else {
				App.Utils.notification("Can't translate when offline");
			}
		},

		// Flashcard transition
		"click #flashcard .front": function(e) {

			if (App.Stacks.practice.pending) { return; }
			App.Stacks.practice.pending = true;

			var time_factor = 1,
			    flipped = App.Stacks.practice.flashcard.flipped,
			    langCode, text, prefs;

			if (App._settings.disable_animation) { time_factor = 0; }
			App.Stacks.practice.flashcard.flipped = !App.Stacks.practice.flashcard.flipped;

			App.$("#flashcard .front").transition({ rotateX: 180 }, 750 * time_factor, function() {
				App.Stacks.practice.pending = false;
			});

			App.$("#flashcard .back").transition({ rotateX: 365 }, 750 * time_factor);
			App.$("#flashcard-shadow").transition({ rotateX: 180 }, 750 * time_factor);

			App.$("#practice-buttons").delay(750 * time_factor).fadeIn(500 * time_factor);

			if (App._settings.tts_auto) {

				prefs = App._settings.translation_preferences && App._settings.translation_preferences[App.Stacks.practice.flashcard.value.stackID];
				
				if (prefs) {
					langCode = flipped ? prefs.from : prefs.to;
					text = App.Utils.markdown(App.Stacks.practice.flashcard.value[flipped ? "front" : "back"], true);
					App.Utils.speak(text, langCode);
				}
			}
		},

		"click #flashcard .back": function(e) {

			if (App.Stacks.practice.pending) { return; }
			App.Stacks.practice.pending = true;

			var time_factor = 1,
			    flipped = App.Stacks.practice.flashcard.flipped,
			    langCode, text, prefs;

			if (App._settings.disable_animation) { time_factor = 0; }
			App.Stacks.practice.flashcard.flipped = !App.Stacks.practice.flashcard.flipped;

			App.$("#flashcard .front").transition({ rotateX: 5 }, 750 * time_factor, function() {
				App.Stacks.practice.pending = false;
			});

			App.$("#flashcard .back").transition({ rotateX: 180 }, 750 * time_factor);
			App.$("#flashcard-shadow").transition({ rotateX: 0 }, 750 * time_factor);

			if (App._settings.tts_auto) {

				prefs = App._settings.translation_preferences && App._settings.translation_preferences[App.Stacks.practice.flashcards.stackID];
				
				if (prefs) {
					langCode = App.Stacks.practice.flashcard.flipped ? prefs.to : prefs.from;
					text = App.Utils.markdown(App.Stacks.practice.flashcard.value[flipped ? "front" : "back"], true);
					App.Utils.speak(text, langCode);
				}
			}
		}
	};

	/* ===================== */
	/* ====== GET ALL ====== */
	/* ===================== */

	Flashcards.getAll = function(stackID, callback, applyMarkdown) {
		App.DB.getData("App", "Flashcards", stackID !== undefined ? { index: "stackID", range: stackID } : null, function(data) {

			if (applyMarkdown) {
				data.forEach(function(v) {
					v.value.front = App.Utils.markdown(v.value.front);
					v.value.back = App.Utils.markdown(v.value.back);
				});
			}

			data = data.sort(function(a, b) { return a.value.front < b.value.front ? -1 : 1; });
			callback(data, stackID);
		});
	};

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Flashcards.get = function(key, callback) {
		App.DB.getData("App", "Flashcards", key, function(data) {

			callback(data);
		});
	};

	/* =========================== */
	/* ====== GET SELECTION ====== */
	/* =========================== */

	Flashcards.getSelection = function() {
		var $checkboxes = App.Router.$page.find(".flashcards td input:checked");
		var cards = [], card;

		$checkboxes.each(function() {
			var $parent = App.$(this).parents("tr");

			card = {
				stackID: +$parent.attr("data-stackID") || App.Stacks.current,
				key: +$parent.attr("data-key")
			};

			cards.push(card);
		});

		return cards;
	};

	/* ================= */
	/* ====== ADD ====== */
	/* ================= */

	Flashcards.add = function(data, callback) {

		// Add key(s)
		App.DB.addData("App", "Flashcards", data, function(e) {

			if (callback) { callback(); }
			if (data.length) { return; }
			
			App.Router.$page.find("textarea[name=front]").val("");
			App.Router.$page.find("textarea[name=back]").val("");
			App.Router.$page.find("input[name=tags]").val("");

			App.Utils.notification("Flashcard added");
		});
	};

	/* ==================== */
	/* ====== UPDATE ====== */
	/* ==================== */

	Flashcards.update = function(key, newData, callback) {

		App.DB.updateData("App", "Flashcards", key, newData, function() {

			if (callback) { callback(); }

			if (Flashcards.update.queue && Flashcards.update.queue.length) {
				var card = Flashcards.update.queue.shift();
				window.location.hash = "page-flashcard-edit:" + card.stackID + ":" + card.key;
				return;
			}

			window.location.hash = Flashcards.update.origin;
		});
	};

	Flashcards.translate = function(stackID, text, isFront) {

		var prefs = App._settings.translation_preferences && App._settings.translation_preferences[stackID], from, to, url, $target;
		if (!prefs) { return App.Utils.notification("Please set your translation preferences in your stack settings first"); }

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

	Flashcards.remove = function(card, no_UI) {

		var cards = typeof card == "object" && card.length ? card : [card], count = 0;
		var fn = function(key) {

			if (fn.fired) { return; }
			fn.fired = true;

			if (!no_UI) {
				cards.forEach(function(v) {
					App.Router.$page.find("tr[data-key=" + v.key + "]").remove();
				});

				if (App.Router.$page.find("tr").length < 6) {
					App.Router.$page.find(".note").show();
					App.$(".flashcard-actions-container").hide();
				}
			}
			
			count++;
		};

		// Workaround...
		if (window.shimIndexedDB) {
			card.forEach(function(card) {
				App.DB.removeData("App", "Flashcards", card.key, function() { fn(card.key); });
			});
		} else {

			// Remove key(s)
			App.DB.removeData("App", "Flashcards", { index: "stackID", keys: cards.map(function(v) { return v.key; }) }, function() { fn(card.key); });
		}
	};

	/* ================== */
	/* ====== MOVE ====== */
	/* ================== */

	Flashcards.move = function() {

		var destination = App.$("#dialog select option:selected").text();
		var stackID = +$("#dialog select option:selected").attr("data-key");
		var $checkboxes = App.Router.$page.find(".flashcards td input:checked");
		var cards = Flashcards.getSelection();

		var fn_finish = function(e) {

			var is_search = App.Router.$page.attr("id") == "page-search";

			cards.forEach(function(v) {
				if (v.key != App.Stacks.current && !is_search) {
					App.Router.$page.find("tr[data-key=" + v.key + "]").remove();
				}
			});

			if (App.Router.$page.find("tr").length < 6) {
				App.Router.$page.find(".note").show();
				App.$(".flashcard-actions-container").hide();
			}

			App.Utils.notification("Moved " + cards.length + " flashcards to " + destination);
		};

		// Workaround...
		if (window.shimIndexedDB) {

			cards.forEach(function(v) {
				delete Flashcards.update.queue;
				Flashcards.update.origin = window.location.hash.substr(1);
				cards.map(function(v) { Flashcards.update(v.key, { stackID: stackID }); });
			});

			return fn_finish();
		}

		App.DB.updateData("App", "Flashcards", {

				index: "stackID",
				range: App.Stacks.current,
				keys: cards.map(function(v) { return v.key; })

			}, { stackID: stackID },

			fn_finish
		);
	};

	Flashcards.search = (function() {

		var tests = {
			category: function(v, fl) { return v.indexOf(fl.category) != -1; },
			stack: function(v, fl) { return v.indexOf(fl.stack) != -1; },
			raw: function(v, fl) { return fl.value.front.indexOf(v) != -1 || fl.value.back.indexOf(v) != -1; },
			front: function(v, fl) { return fl.value.front.indexOf(v) != -1; },
			back: function(v, fl) { return fl.value.back.indexOf(v) != -1; },
			score_front: function(v, fl) {

				var match = false;
				
				if (v[0] == "<")
				{ match = fl.value.score_front < +v.substr(1); }
				else if (v[0] == ">")
				{ match = fl.value.score_front > +v.substr(1); }
				else
				{ match = fl.value.score_front == +v; }

				return match;
			},

			score_back: function(v, fl) {

				var match = false;
				
				if (v[0] == "<")
				{ match = fl.value.score_back < +v.substr(1); }
				else if (v[0] == ">")
				{ match = fl.value.score_back > +v.substr(1); }
				else
				{ match = fl.value.score_back == +v; }

				return match;
			},

			tags: function(v, fl) {
				return v.some(function(tag) {
					return fl.value.tags.indexOf(tag) != -1;
				});
			}
		}, fn_parse, fn_process, pending, last_query, timeout;

		fn_parse = function(query_string) {

			var query = {}, query_pairs = [], start = 0, quotes;

			// Split the query on whitespace excpet when
			// the whitespace is contained in quotes
			query_string.split("").map(function(v, i) {
				
				if (v == "\"") { quotes = !quotes; }
				
				if (i == query_string.length-1) {
					quotes = false;
					v = " ";
					i++;
				}

				if (!quotes && v == " ") {
					query_pairs.push(query_string.substring(start, i).replace(/\"/g, ""));
					start = i+1;
				}
			});

			// Form syntax pairs into a proper object
			query_pairs.forEach(function(v) {

				var pair = v.split(":");
				var filter = pair[0];
				var search = pair[1];

				if (pair.length == 1) {
					if (query.raw) { return true; }
					query.raw = pair[0];
					return true;
				}

				if (filter == "tags")
				{ search = search.split(/ ?, ?/g); }
				else if (["category", "stack"].indexOf(filter) != -1)
				{ search = search.split(/ ?\|\| ?/g); }

				query[pair[0]] = search;
			});

			fn_process(query);
		};

		fn_process = function(query) {

			// Don't excessively search while typing
			if (pending) {

				last_query = query;

				window.clearTimeout(timeout);
				timeout = window.setTimeout(function() {
					pending = false;
					fn_process(last_query);
				}, 250);

				return;
			}

			pending = true;

			// No input
			if (!Object.keys(query).length) { return App.Router.$page.find(".flashcards tr").show(); }

			var keys = [], show = [], hide = [], query_tests = Object.keys(query);

			// Perform tests
			App._search.forEach(function(v) {

				var passed = 0;

				query_tests.forEach(function(t) {
					if (tests[t] && tests[t](query[t], v)) { passed++; }
				});

				if (passed == query_tests.length) { keys.push(v.key); }
			});

			// Get table row objects
			App.Router.$page.find(".flashcards tr").each(function(i) {
				if ($(this).index() < 2) { return true; }
				if (keys.indexOf(+App.$(this).attr("data-key")) != -1)
				{ show.push(this); }
				else
				{ hide.push(this); }
			});

			App.$.call(this, show).show();
			App.$.call(this, hide).hide();
		};

		return fn_parse;
	}());

	return Flashcards;
});