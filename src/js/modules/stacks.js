define(function() {

	var Stacks = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Stacks.initialize = function() {

		App = require("app");
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Stacks.events = {

		// Expand category
		"click #stacks > li ": function(e) {
			App.$(e.currentTarget).toggleClass("expand");
		},

		// Stack link
		"click #stacks > li > ul > li": function(e) {
			window.location.hash = "page-stack:" + App.$(e.currentTarget).attr("data-key");
		},

		// Create stack
		"click .button-new-stack": function(e) {

			App.Utils.dialog("Enter stack name", {

				content: "<input type='text' name='stack-category' placeholder='Category'><br><br>" +
				         "<input type='text' name='stack-name' placeholder='Stackname'>",

				buttons: {
					ok: Stacks.create,
					cancel: true
				}
			});
		},

		// Rename stack
		"click .button-rename-stack": function(e) {

			var pair = App.Router.$page.find(".stack-name").text().split(" // ");
			var category = pair.shift();
			var stack = pair.join("");
			
			App.Utils.dialog("Enter stack name", {

				content: "<input type='text' name='stack-category' value='" + category + "'><br><br>" +
				         "<input type='text' name='stack-name' value='" + stack + "'>",

				buttons: {
					ok: function() { Stacks.rename(Stacks.current); },
					cancel: true
				}
			});
		},

		// Reset statistics
		"click .button-reset-stack": function(e) {

			App.Utils.dialog("Confirm", {
				content: "Reset individual flashcard statistics for this stack?",
				buttons: { ok: function() { App.Statistics.reset(Stacks.current); }, cancel: true }
			});
		},

		// Remove stack
		"click .button-remove-stack": function(e) {

			var stack = App.Router.$page.find(".stack-name").text();

			App.Utils.dialog("Confirm", {
				content: "Remove \"" + stack + "\" and all of its flashcards?",
				buttons: { ok: function() { Stacks.remove(Stacks.current); }, cancel: true }
			});
		},

		// Practice mode
		"click .button-practice": function(e) {
			Stacks.practice.initialize();
		},

		// Practice buttons
		"click #practice-buttons .button": function(e) {

			var correct = App.$(e.currentTarget).hasClass("green");

			if (correct)
			{ Stacks.practice.score++; }

			Stacks.practice.updateStats(correct, Stacks.practice.advance);
		},

		// Exit practice
		"click .button-exit-practice": function(e) {
			Stacks.practice.abort();
		},

		// Quiz buttons
		"click #quiz .quiz-answer": function(e) {

			if (Stacks.quiz.pending) { return; }
			Stacks.quiz.pending = true;

			var $target = App.$(e.currentTarget);
			var correct = $target.attr("data-correct") == "true";
			var flipped = Stacks.quiz.question.flipped;
			var langCode, text, prefs;

			var fn = function() {
				Stacks.quiz.pending = false;
				$target.removeClass(correct ? "correct" : "false");
				if (!Stacks.quiz.question.failed) { Stacks.quiz.score++; }

				if (correct) {
					Stacks.quiz.updateStats(!Stacks.quiz.question.failed, Stacks.quiz.advance);
				}
			};

			if (!correct) { Stacks.quiz.question.failed = true; }
			$target.addClass(correct ? "correct" : "false");

			if (correct && App._settings.tts_auto) {

				prefs = App._settings.translation_preferences && App._settings.translation_preferences[Stacks.quiz.question.value.stackID];
				
				if (prefs) {
					langCode = flipped ? prefs.from : prefs.to;
					text = App.Utils.markdown(Stacks.quiz.question.value[flipped ? "front" : "back"], true);
					App.Utils.speak(text, langCode, fn);
				}
			}

			if (!prefs) { window.setTimeout(fn, 500); }
		},

		// Quiz mode
		"click .button-quiz": function(e) {
			window.location.hash = "page-quiz:" + Stacks.current;
		},

		// Exit quiz
		"click .button-exit-quiz": function(e) {
			Stacks.quiz.abort();
		},

		// Return to stacks
		"click .button-return-stacks": function(e) {
			window.location.hash = "#page-stacks";
		},

		// Return to stack
		"click .button-return-stack": function(e) {
			window.location.hash = "page-stack:" + App.Stacks.current;
		},

		// Stack settings
		"click .button-stack-settings": function(e) {
			window.location.hash = "page-stack-settings:" + Stacks.current;
		},

		// Stack settings
		"change .languages": function(e) {

			var stackID = Stacks.current;
			var isFrom = App.$(e.currentTarget).hasClass("from");
			var code = App.$(e.currentTarget).val();

			if (!App._settings.translation_preferences)
			{ App._settings.translation_preferences = {}; }

			if (!App._settings.translation_preferences[stackID])
			{ App._settings.translation_preferences[stackID] = {}; }

			App._settings.translation_preferences[stackID][isFrom ? "from" : "to"] = code;
			App.Utils.localStorage("settings", App._settings);
		},

		"click .button-apply-lang-all": function(e) {

			var category = App.Router.$page.find(".stack-name").text().split(" // ").shift();
			var from = App.$(".languages.from").val();
			var to = App.$(".languages.to").val();

			if (!App._settings.translation_preferences)
			{ App._settings.translation_preferences = {}; }

			Stacks.getAll(function(data) {
				[].forEach.call(data, function(v) {
					if (v.value.category != category) { return; }

					var stackID = v.key;
					App._settings.translation_preferences[stackID] = { from: from, to: to };
				});

				App.Utils.localStorage("settings", App._settings);
				App.Utils.notification("Updated stack settings successfully");
			});
		},

		"click .tts": function(e) {
			if (!Stacks.practice.flashcard) { return; }

			var prefs = App._settings.translation_preferences && App._settings.translation_preferences[Stacks.practice.flashcard.value.stackID],
				flipped = Stacks.practice.flashcard.flipped,
			    langCode, text;
			
			if (prefs) {
				langCode = flipped ? prefs.to : prefs.from;
				text = App.Utils.markdown(Stacks.practice.flashcard.value[flipped ? "back" : "front"], true);
				App.Utils.speak(text, langCode);
			} else {
				App.Utils.notification("Please set your translation preferences in your stack settings first");
			}
		}
	};

	/* ========================= */
	/* ====== UPDATE VIEW ====== */
	/* ========================= */

	Stacks.updateView = function() {

		Stacks.getAll(function(stacks) {

			var $stacks = App.$("#stacks"),
			    $category, categories = {},
			    category, fn_insert;

			fn_insert = function(v) {
				Stacks.countFlashcards(v, function(stack) {
					$category = $stacks.find("li[data-category='" + stack.value.category + "']");

					$category.find("ul").append(
						"<li class='stack' data-key='" + stack.key + "'>" +
							"<span class='fa fa-tags' style='margin-right: 0.5em;'></span>" +
							v.value.name +
							"<span class='fa fa-arrow-right'></span>" +
							"<span class='count'>" + stack.value.flashcardAmount + " Cards</span>" +
						"</li^>"
					);
				});
			};

			if (stacks.length) {

				[].forEach.call(stacks, function(v) {

					var category = v.value.category || "Uncategorized";
					if (category == "Uncategorized") { v.value.category = category; }

					if (!categories[category]) {

						categories[category] = [];

						$stacks.append(
							"<li data-category='" + category + "'>" +
								"<div class='category'>" +
									"<span class='fa fa-fw fa-caret-right'></span> " +
									category +
								"</div>" +
								"<ul></ul>" +
							"</li>"
						);
					}

					categories[category].push(v);
				});

				for (category in categories) {
					stacks = categories[category];
					$category = $stacks.find("li[data-category='" + category + "'] .category");
					$category.append("<span class='count'>" + stacks.length + " Stacks</span>");
				}

				for (category in categories) {
					stacks = categories[category];
					stacks.forEach(fn_insert);
				}

				App.Router.$page.find(".view-all").css("display", "block");

			} else { App.Router.$page.find(".note").show(); }
		});
	};

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Stacks.get = function(id, callback) {
		App.DB.getData("App", "Stacks", id, function(data) {
			if (!data) { return; }

			data.id = id;
			if (callback) { callback(data); }
		});
	};

	/* ===================== */
	/* ====== GET ALL ====== */
	/* ===================== */

	Stacks.getAll = function(callback) {
		App.DB.getData("App", "Stacks", null, function(data) {
			data = data.sort(function(a, b) { return a.value.category < b.value.category ? -1 : 1; });
			callback(data);
		});
	};

	/* ============================== */
	/* ====== COUNT FLASHCARDS ====== */
	/* ============================== */

	Stacks.countFlashcards = function(stack, callback) {
		App.DB.countObjectStoreEntries("App", "Flashcards", ["stackID", stack.key], function(num) {
			stack.value.flashcardAmount = num;
			if (callback) { callback(stack); }
		});
	};

	/* ==================== */
	/* ====== CREATE ====== */
	/* ==================== */

	Stacks.create = function(category, name, callback, no_UI) {

		if (typeof category != "string") { category = App.$("#dialog input[name='stack-category']").val().trim(); }
		if (typeof name != "string") { name = App.$("#dialog input[name='stack-name']").val().trim(); }

		category = App.Utils.escapeHTML(category);
		name = App.Utils.escapeHTML(name);

		App.DB.addData("App", "Stacks", { category: category, name: name }, function(e) {

			var key = e.target.result, $stacks, $category;

			if (!no_UI) {

				category = category || "Uncategorized";

				$stacks = App.$("#stacks");
				$category = $stacks.find("li[data-category='" + category + "']");

				if (!App.$(".stack").length) {
					App.Router.$page.find(".view-all").css("display", "block");
					App.Router.$page.find(".note").hide();
				}

				if (!$category.length) {

					$stacks.append(
						"<li data-category='" + category + "'>" +
							"<div class='category'>" +
								"<span class='fa fa-fw fa-caret-right'></span> " +
								category +
							"</div>" +
							"<ul></ul>" +
						"</li>"
					);

					$category = $stacks.find("li[data-category='" + category + "']");
				}

				$category.find("ul").append(
					"<li class='stack' data-key='" + key + "'>" +
						"<span class='fa fa-tags' style='margin-right: 0.5em;'></span>" +
						name +
						"<span class='fa fa-arrow-right' style='float: right;'></span>" +
						"<span class='count'>0 Cards</span>" +
					"</li>"
				);

				$category.toggleClass("expand", true);
			}

			if (callback) { callback(key, category, name); }
		});
	};

	/* ==================== */
	/* ====== REMOVE ====== */
	/* ==================== */

	Stacks.remove = function(id) {
		App.Flashcards.getAll(id, function(flashcards) {

			var keys = [].map.call(flashcards, function(v) { return v.key; });
			App.Flashcards.remove(keys, true);

			App.Flashcards.getAll(id, function(data) {

				var keys = data.map(function(v) { return v.key; });

				if (window.shimIndexedDB) {
					keys.forEach(function(v) {
						App.DB.removeData("App", "Flashcards", v);
					});

					App.DB.removeData("App", "Stacks", id, function(e) {
						App.$(".stack[data-key=" + id + "]").remove();
						if (!App.$(".stack").length) { App.Router.$page.find(".note").show(); }
						window.location.hash = "page-stacks";
					});
				} else {

					App.DB.removeData("App", "Flashcards", { index: "stackID", range: id, keys: keys }, function(e) {
						App.DB.removeData("App", "Stacks", id, function(e) {
							App.$(".stack[data-key=" + id + "]").remove();
							if (!App.$(".stack").length) { App.Router.$page.find(".note").show(); }
							window.location.hash = "page-stacks";
						});
					});
				}
			});
		});
	};

	/* ==================== */
	/* ====== RENAME ====== */
	/* ==================== */

	Stacks.rename = function(id) {

		var category = App.$("#dialog input[name='stack-category']").val().trim();
		var name = App.$("#dialog input[name='stack-name']").val().trim();

		category = App.Utils.escapeHTML(category);
		name = App.Utils.escapeHTML(name);

		App.DB.updateData("App", "Stacks", id, { category: category, name: name }, function(e) {
			App.$(".stack[data-key=" + id + "] b").html(name);
			App.Router.$page.find(".stack-name").html(category + " // " + name);
		});
	};

	/* ====================== */
	/* ====== PRACTICE ====== */
	/* ====================== */

	Stacks.practice = (function() {

		var api = {};

		function initialize() {

			var keys = [],
			    selection = App.Flashcards.getSelection(),
			    $cards_visible;

			Stacks.practice.custom = App.Router.$page.attr("id") == "page-search";
			Stacks.practice.origin = window.location.hash.substr(1);

			if (selection.length) {

				keys = selection.map(function(v) { return v.key; });
				App.Utils.dialog("Selective Practice", {

					content: "You have selected one or more flashcards. Would you like to practice only those selected? " +
					"This also disables progress-statistics for this session.",

					buttons: {
						ok: function() {
							Stacks.practice.custom = true;
							App.Flashcards.get(keys, process);
						},
						cancel: true
					}
				});
			} else {

				$cards_visible = App.Router.$page.find(".flashcards tr:visible");
				$cards_visible.each(function(i) {
					if ($(this).index() < 2) { return true; }
					keys.push(+$(this).attr("data-key"));
				});

				if ($cards_visible.length != App.Router.$page.find(".flashcards tr").length) {

					if ($cards_visible.length < 3) {
						App.Utils.notification("No flashcards visible for filtered practice");
						return;
					}

					App.Utils.dialog("Filtered Practice", {

						content: "You have filtered your flashcards. Only those visible will be included in practice mode. " +
						"This also disables progress-statistics for this session. Continue?",

						buttons: {
							ok: function() {
								Stacks.practice.custom = true;
								App.Flashcards.get(keys, process);
							},
							cancel: true
						}
					});

				} else { App.Flashcards.get(keys, process); }
			}
		}

		function process(data) {

			if (!data.length) {

				App.$("#flashcard .front span").html("┗(･ω･;)┛");
				App.Utils.dialog("No flashcards available!", "Create at least one flashcard to start practicing");

				return;
			}

			Stacks.practice.stackID = Stacks.current;
			Stacks.practice.total = data.length;
			Stacks.practice.index = 0;
			Stacks.practice.score = 0;
			
			// Shuffle
			if (App._settings.shuffle_flashcards)
			{ data = App.Utils.array_shuffle(data); }

			// Replace linebreaks
			data = data.map(function(v) {
				v.value.front = v.value.front.replace(/\n/, "<br>");
				v.value.back = v.value.back.replace(/\n/, "<br>");

				return v;
			});

			App.Router.route("page-practice");

			Stacks.practice.flashcards = data;
			Stacks.practice.advance();
		}

		function end() {
			delete Stacks.practice.flashcards;

			if (!Stacks.practice.custom) {
				App.Statistics.registerPracticeSession(
					Stacks.practice.stackID,
					Stacks.practice.score,
					Stacks.practice.total
				);
			}

			var score = Math.round(100/Stacks.practice.total*Stacks.practice.score);
			var message = Stacks.resultMessages[Math.round(App.Utils.translateRange(score, 0, 100, 0, 4))];
		
			App.Utils.dialog(
				"Session complete!",
				"<b>Score:</b> " + (Stacks.practice.score) + "/" + Stacks.practice.total + " (" + score + "%)<br><br>" + message,
				function() { App.Router.route(Stacks.practice.origin); }
			);
		}

		function abort() {
			delete Stacks.practice.flashcards;
			delete Stacks.practice.index;
			App.Router.route(Stacks.practice.origin);
		}

		function updateStats(bool, callback) {
			if (bool !== undefined) {
				var flipped = Stacks.practice.flashcard._flipped;
				var score = Stacks.practice.flashcard.value.score || {front:{yes:0,no:0},back:{yes:0,no:0}};
				if (typeof score == "string") { score = JSON.parse(score); }

				score[flipped ? "back" : "front"][bool ? "yes" : "no"]++;
				App.DB.updateData("App", "Flashcards", Stacks.practice.flashcard.key, { score: JSON.stringify(score) }, callback || function(){});
			} else {
				App.Router.$page.find(".stats").html("Flashcard " + (Stacks.practice.index) + " of " + Stacks.practice.total + "<br>");
			}
		}

		function advance() {

			var flashcard = Stacks.practice.flashcards[Stacks.practice.index++];
			if (!flashcard) { return end(); }
			Stacks.practice.flashcard = flashcard;

			var $front = App.$("#flashcard .front"),
			    $back = App.$("#flashcard .back"),
			    flipped = App._settings.switch_front_back,
			    tallest, prefs, langCode, text;

			if (App._settings.switch_front_back_randomly)
			{ flipped = Math.round(Math.random()); }

			flashcard._flipped = flipped;
			flashcard.flipped = flipped;

			var front = flipped ? flashcard.value.back : flashcard.value.front;
			var back = flipped ? flashcard.value.front : flashcard.value.back;

			// Show/Hide buttons
			App.$("#practice-buttons").toggle(!!App._settings.always_show_buttons);

			// Reset rotation
			$front.css({ rotateX: 5 });
			$back.css({ rotateX: 180 });
			App.$("#flashcard-shadow").css({ rotateX: 0 });

			// Insert new data
			$front.removeAttr("style").find("span").html(App.Utils.markdown(front));
			$back.removeAttr("style").find("span").html(App.Utils.markdown(back));

			// Make each flashcard side of equal size
			tallest = Math.max($front.height(), $back.height());
			$front.height(tallest);
			$back.height(tallest);

			updateStats();

			if (App._settings.tts_auto) {

				prefs = App._settings.translation_preferences && App._settings.translation_preferences[Stacks.practice.flashcard.value.stackID];
				
				if (prefs) {
					langCode = flipped ? prefs.to : prefs.from;
					text = App.Utils.markdown(front, true);
					App.Utils.speak(text, langCode);
				}
			}
		}

		api = {
			initialize: initialize,
			updateStats: updateStats,
			advance: advance,
			abort: abort
		};

		return api;

	}());

	/* ================== */
	/* ====== QUIZ ====== */
	/* ================== */

	Stacks.quiz = (function() {

		var api = {};

		function initialize(id) {

			App.Flashcards.getAll(id, function(data) {

				if (data.length < 4) {

					App.Utils.dialog("Not enough flashcards available!", "Create at least four flashcard to start the quiz", function() {
						window.location.hash = "page-stack:" + id;
					});

					return;
				}

				Stacks.quiz.stackID = id;
				Stacks.quiz.total = data.length;
				Stacks.quiz.index = 0;
				Stacks.quiz.score = 0;
				
				// Shuffle
				if (App._settings.shuffle_flashcards)
				{ data = App.Utils.array_shuffle(data); }

				// Replace linebreaks

				data = data.map(function(v) {
					v.value.front = v.value.front.replace(/\n/, "<br>");
					v.value.back = v.value.back.replace(/\n/, "<br>");

					return v;
				});

				Stacks.quiz.flashcards = data;
				Stacks.quiz.advance();
			});
		}

		function end() {
			delete Stacks.quiz.flashcards;

			App.Statistics.registerPracticeSession(
				Stacks.quiz.stackID,
				Stacks.quiz.score,
				Stacks.quiz.total
			);

			var score = Math.round(100/Stacks.quiz.total*Stacks.quiz.score);
			var message = Stacks.resultMessages[Math.round(App.Utils.translateRange(score, 0, 100, 0, 4))];
		
			App.Utils.dialog(
				"Session complete!",
				"<b>Score:</b> " + (Stacks.quiz.score) + "/" + Stacks.quiz.total + " (" + score + "%)<br><br>" + message,
				function() { window.location.hash = "page-stack:" + Stacks.quiz.stackID; }
			);
		}

		function abort() {
			delete Stacks.quiz.flashcards;
			delete Stacks.quiz.index;
			window.location.hash = "page-stack:" + Stacks.quiz.stackID;
		}

		function updateStats(bool, callback) {
			if (bool !== undefined) {
				var flipped = Stacks.quiz.question._flipped;
				var score = Stacks.quiz.question.value.score || {front:{yes:0,no:0},back:{yes:0,no:0}};
				if (typeof score == "string") { score = JSON.parse(score); }

				score[flipped ? "back" : "front"][bool ? "yes" : "no"]++;
				App.DB.updateData("App", "Flashcards", Stacks.quiz.question.key, { score: JSON.stringify(score) }, callback || function(){});
			} else {
				App.Router.$page.find(".stats").html((Stacks.quiz.index) + " of " + Stacks.quiz.total + "<br>");
			}
		}

		function advance() {

			var question = Stacks.quiz.flashcards[Stacks.quiz.index++];
			if (!question) { return end(); }
			Stacks.quiz.question = question;

			var $question = App.$("#quiz .quiz-question"),
			    $answers = App.$("#quiz .quiz-answer"),
			    flipped = App._settings.switch_front_back,
			    right_answer, indices, index, val, i, langCode, text, prefs;

			if (App._settings.switch_front_back_randomly)
			{ flipped = Math.round(Math.random()); }
			
			$answers.removeAttr("data-correct");
			question._flipped = flipped;
			question.flipped = flipped;
			question.failed = false;

			var front = flipped ? question.value.back : question.value.front;
			var back = flipped ? question.value.front : question.value.back;

			right_answer = Array.prototype.splice.call($answers, App.Utils.rand(0, 3), 1);

			// Insert new data
			$question.html(App.Utils.markdown(front));
			App.$(right_answer).html(App.Utils.markdown(back));
			App.$(right_answer).attr("data-correct", "true");

			indices = [Stacks.quiz.index-1];
			index = Stacks.quiz.index-1;

			for (i = 0; i < 3; i++) {

				while (indices.indexOf(index) != -1)
				{ index = App.Utils.rand(0, Stacks.quiz.total-1); }

				indices.push(index);
				val = App.Utils.markdown(Stacks.quiz.flashcards[index].value[flipped ? "front" : "back"]);

				App.$(Array.prototype.pop.call($answers)).html(val);
			}

			updateStats();

			if (App._settings.tts_auto) {

				prefs = App._settings.translation_preferences && App._settings.translation_preferences[Stacks.quiz.question.value.stackID];
				
				if (prefs) {
					langCode = flipped ? prefs.to : prefs.from;
					text = App.Utils.markdown(front, true);
					App.Utils.speak(text, langCode);
				}
			}
		}

		api = {
			initialize: initialize,
			updateStats: updateStats,
			advance: advance,
			abort: abort
		};

		return api;

	}());

	Stacks.resultMessages = [
		// >= 0%
		"Uh ou.. keep trying my friend!",

		// >= 20%+
		"I think you can do better!",

		// >= 40%+
		"We're getting there!",

		// >= 60%+
		"Almost there!",

		// >= 80%+
		"Well done!"
	];

	return Stacks;
});