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

		"click|touchstart": function(e) {

			var $target = App.$(e.target);
			if ($target.parent().hasClass("button-android-menu")) { $target = $target.parent(); }

			if ($target.hasClass("button-android-menu")) { return; }
			App.$(".actions").removeClass("android-menu");
		},

		"click .button-android-menu": function(e) {

			var $actions = App.Router.$page.find(".actions");
			$actions.toggleClass("android-menu");
			App.Utils.forceRender($("body"));
		},

		// Expand category
		"click #stacks > li ": function(e) {
			$(e.currentTarget).toggleClass("expand");
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

		// Remove stack
		"click .button-remove-stack": function(e) {
			var stack = App.$("#page-stack-settings .stack-name").text();
			var stackID = +window.location.hash.split(":")[1];

			App.Utils.dialog("Confirm", {

				content: "Remove \"" + stack + "\" and all of its flashcards?",

				buttons: {
					ok: function() { Stacks.remove(stackID); },
					cancel: true
				}
			});
		},

		// Rename stack
		"click .button-rename-stack": function(e) {
			var stackID = +window.location.hash.split(":")[1];
			var pair = App.$("#page-stack-settings .stack-name").text().split(" // ");

			var category = pair.shift();
			var stack = pair.join("");
			
			App.Utils.dialog("Enter stack name", {

				content: "<input type='text' name='stack-category' value='" + category + "'><br><br>" +
				         "<input type='text' name='stack-name' value='" + stack + "'>",

				buttons: {
					ok: function() { Stacks.rename(stackID); },
					cancel: true
				}
			});
		},

		// Practice mode
		"click .button-practice": function(e) {
			var stackID = +window.location.hash.split(":")[1];
			window.location.hash = "page-practice:" + stackID;
		},

		// Practice buttons
		"click #practice-buttons .button": function(e) {

			if ($(e.currentTarget).hasClass("green"))
			{ App.Stacks.practice.score++; }

			App.Stacks.practice();
		},

		// Exit practice
		"click .button-exit-practice": function(e) {
			var stackID = +window.location.hash.split(":")[1];
			delete Stacks.practice.flashcards;
			delete Stacks.practice.index;
			window.location.hash = "page-stack:" + stackID;
		},

		// Quiz buttons
		"click #quiz .quiz-answer": function(e) {

			if (Stacks.quiz.pending) { return; }
			Stacks.quiz.pending = true;

			var $target = $(e.currentTarget);
			var correct = $target.attr("data-correct") == "true";

			if (!correct) { Stacks.quiz.question.failed = true; }
			$target.addClass(correct ? "correct" : "false");

			window.setTimeout(function() {
				Stacks.quiz.pending = false;
				$target.removeClass(correct ? "correct" : "false");
				if (!Stacks.quiz.question.failed) { App.Stacks.quiz.score++; }
				if (correct) { Stacks.quiz(); }
			}, 500);
		},

		// Quiz mode
		"click .button-quiz": function(e) {
			var stackID = +window.location.hash.split(":")[1];
			window.location.hash = "page-quiz:" + stackID;
		},


		// Exit quiz
		"click .button-exit-quiz": function(e) {
			var stackID = +window.location.hash.split(":")[1];
			delete Stacks.quiz.flashcards;
			delete Stacks.quiz.index;
			window.location.hash = "page-stack:" + stackID;
		},

		// Return to stacks
		"click .button-return-stacks": function(e) {
			window.location.hash = "#page-stacks";
		},

		// Return to stack
		"click .button-return-stack": function(e) {
			var stackID = +window.location.hash.split(":")[1];
			window.location.hash = "#page-stack:" + stackID;
		},

		// Stack settings
		"click .button-stack-settings": function(e) {
			var stackID = +window.location.hash.split(":")[1];
			window.location.hash = "page-stack-settings:" + stackID;
		},

		// Stack settings
		"change select.languages": function(e) {

			var stackID = +window.location.hash.split(":")[1];
			var isFrom = $(e.currentTarget).hasClass("from");
			var code = $(e.currentTarget).val();

			if (!App._settings.translation_preferences)
			{ App._settings.translation_preferences = {}; }

			if (!App._settings.translation_preferences[stackID])
			{ App._settings.translation_preferences[stackID] = {}; }

			App._settings.translation_preferences[stackID][isFrom ? "from" : "to"] = code;
			App.Utils.localStorage("settings", App._settings);
		},


	};

	/* ========================= */
	/* ====== UPDATE VIEW ====== */
	/* ========================= */

	Stacks.updateView = function() {

		Stacks.getAll(function(stacks) {

			var $stacks = App.$("#stacks"), $category, category;
			$stacks.html("");

			var categories = {};

			if (stacks.length) {


				$stacks.parent().find(".note").hide();

				[].forEach.call(stacks, function(v) {

					category = v.value.category || "Uncategorized";
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

					stacks.forEach(function(v) {
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
					});
				}

			} else { $stacks.parent().find(".note").show(); }
		});
	};

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Stacks.get = function(id, callback) {
		App.DB.getData("App", "Stacks", id, function(data) {
			if (!data) { return; }

			data.id = id;
			callback(data);
		});
	};

	/* ===================== */
	/* ====== GET ALL ====== */
	/* ===================== */

	Stacks.getAll = function(callback) {
		App.DB.getData("App", "Stacks", null, callback);
	};

	/* ============================== */
	/* ====== COUNT FLASHCARDS ====== */
	/* ============================== */

	Stacks.countFlashcards = function(stack, callback) {
		App.DB.countObjectStoreEntries("App", "Flashcards", ["stackID", stack.key], function(num) {
			stack.value.flashcardAmount = num;
			callback(stack);
		});
	};

	/* ==================== */
	/* ====== CREATE ====== */
	/* ==================== */

	Stacks.create = function(category, name, callback) {

		if (typeof category != "string") { category = $("#dialog input[name='stack-category']").val().trim(); }
		if (typeof name != "string") { name = $("#dialog input[name='stack-name']").val().trim(); }

		name = App.Utils.escapeHTML(name);

		App.DB.addData("App", "Stacks", { category: category, name: name }, function(e) {

			var key = e.target.result,
			    $stacks = $("#stacks"),
			    $category = $stacks.find("li[data-category='" + category + "']");

			if (!App.$(".stack").length) { $("#page-stacks .note").hide(); }

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
				"</li>"
			);

			$category.toggleClass("expand", true);

			if (callback) { callback(key, category, name) }
		});
	};

	/* ==================== */
	/* ====== REMOVE ====== */
	/* ==================== */

	Stacks.remove = function(id) {
		App.Flashcards.getAll(id, function(flashcards) {

			var keys = [].map.call(flashcards, function(v) { return v.key; });
			App.Flashcards.remove(keys, true);

			App.DB.removeData("App", "Stacks", id, function(e) {
				App.$(".stack[data-key=" + id + "]").remove();
				if (!App.$(".stack").length) { App.$("#page-stacks .note").show(); }
				window.location.hash = "page-stacks";
			});
		});
	};

	/* ==================== */
	/* ====== RENAME ====== */
	/* ==================== */

	Stacks.rename = function(id) {

		var category = $("#dialog input[name='stack-category']").val().trim();
		var name = $("#dialog input[name='stack-name']").val().trim();

		App.DB.updateData("App", "Stacks", id, { category: category, name: name }, function(e) {
			App.$(".stack[data-key=" + id + "] b").html(name);
			App.$("#page-stack-settings .stack-name").html(category + " // " + name);
		});
	};

	/* ====================== */
	/* ====== PRACTICE ====== */
	/* ====================== */

	Stacks.practice = function(id) {

		// Fetch flashcards
		if (id !== undefined) {

			App.Flashcards.getAll(id, function(data) {

				if (!data.length) {

					App.$("#flashcard .front span").html("┗(･ω･;)┛");
					App.Utils.dialog("No flashcards available!", "Create at least one flashcard to start practicing", function() {
						window.location.hash = "page-stack:" + id;
					});

					return;
				}

				Stacks.practice.id = id;
				Stacks.practice.total = data.length;
				Stacks.practice.index = 0;
				Stacks.practice.score = 0;
				
				// Shuffle
				if (App._settings.shuffle_flashcards)
				{ data = App.Utils.array_shuffle(data); }

				// Switch and replace linebreaks with <br>
				if (App._settings.switch_front_back) {

					data = data.map(function(v) {

						var front = v.value.front;
						v.value.front = v.value.back.replace(/\n/, "<br>");;
						v.value.back = front.replace(/\n/, "<br>");;

						return v;
					});

				// Only replace linebreaks
				} else {

					data = data.map(function(v) {
						v.value.front = v.value.front.replace(/\n/, "<br>");
						v.value.back = v.value.back.replace(/\n/, "<br>");

						return v;
					});
				}

				Stacks.practice.flashcards = data;
				Stacks.practice();
			}, true);

			return;
		}

		var flashcard = Stacks.practice.flashcards[Stacks.practice.index++],
		    $front = App.$("#flashcard .front"),
		    $back = App.$("#flashcard .back"),
		    tallest;

		// End reached
		if (!flashcard) {
			delete Stacks.practice.flashcards;

			App.Statistics.registerPracticeSession(
				Stacks.practice.id,
				Stacks.practice.score,
				Stacks.practice.total
			);

			App.Utils.dialog("Session complete!", "<b>Score:</b> " + Stacks.practice.score + " out of " + Stacks.practice.total + "<br><br>(*＾▽＾)／", function() {

				window.location.hash = "page-stack:" + Stacks.practice.id;
			});

			return;
		}

		// Swtich front/back randomly
		if (App._settings.switch_front_back_randomly && Math.round(Math.random())) {
			var front = flashcard.value.front;
			flashcard.value.front = flashcard.value.back;
			flashcard.value.back = front;
		}

		// Show/Hide buttons
		App.$("#practice-buttons").toggle(!!App._settings.always_show_buttons);

		// Reset rotation
		$front.css({ rotateX: 5 });
		$back.css({ rotateX: 180 });
		App.$("#flashcard-shadow").css({ rotateX: 0 });

		// Insert new data
		$front.find("span").html(flashcard.value.front);
		$back.find("span").html(flashcard.value.back);

		// Make each flashcard side of equal size
		tallest = Math.max($front.height(), $back.height());
		$front.height(tallest);
		$back.height(tallest);
	};

	/* ================== */
	/* ====== QUIZ ====== */
	/* ================== */

	Stacks.quiz = function(id) {

		// Fetch flashcards
		if (id !== undefined) {

			App.Flashcards.getAll(id, function(data) {

				if (data.length < 4) {

					App.Utils.dialog("Not enough flashcards available!", "Create at least four flashcard to the quiz", function() {
						window.location.hash = "page-stack:" + id;
					});

					return;
				}

				Stacks.quiz.id = id;
				Stacks.quiz.total = data.length;
				Stacks.quiz.index = 0;
				Stacks.quiz.score = 0;
				
				// Shuffle
				if (App._settings.shuffle_flashcards)
				{ data = App.Utils.array_shuffle(data); }

				// Switch and replace linebreaks with <br>
				if (App._settings.switch_front_back) {

					data = data.map(function(v) {

						var front = v.value.front;
						v.value.front = v.value.back.replace(/\n/, "<br>");;
						v.value.back = front.replace(/\n/, "<br>");;

						return v;
					});

				// Only replace linebreaks
				} else {

					data = data.map(function(v) {
						v.value.front = v.value.front.replace(/\n/, "<br>");
						v.value.back = v.value.back.replace(/\n/, "<br>");

						return v;
					});
				}

				Stacks.quiz.flashcards = data;
				Stacks.quiz();
			}, true);

			return;
		}


		Stacks.quiz.question = Stacks.quiz.flashcards[Stacks.quiz.index++];
		var $question = App.$("#quiz .quiz-question"), $answers = App.$("#quiz .quiz-answer");
		$answers.removeAttr("data-correct");

		// End reached
		if (!Stacks.quiz.question) {
			delete Stacks.quiz.flashcards;

			App.Statistics.registerPracticeSession(
				Stacks.quiz.id,
				Stacks.quiz.score,
				Stacks.quiz.total
			);

			App.Utils.dialog("Session complete!", "<b>Score:</b> " + Stacks.quiz.score + " out of " + Stacks.quiz.total + "<br><br>(*＾▽＾)／", function() {

				window.location.hash = "page-stack:" + Stacks.quiz.id;
			});

			return;
		}

		// Swtich front/back randomly
		Stacks.quiz.question.flipped = App._settings.switch_front_back_randomly && Math.round(Math.random());

		if (Stacks.quiz.question.flipped) {
			var front = flashcard.value.front;
			flashcard.value.front = flashcard.value.back;
			flashcard.value.back = front;
		}

		var right_answer = Array.prototype.splice.call($answers, App.Utils.rand(0, 3), 1),
		    indices, index, val, i;

		// Insert new data
		$question.html(Stacks.quiz.question.value.front);
		$(right_answer).html(Stacks.quiz.question.value.back);
		$(right_answer).attr("data-correct", "true");

		indices = [Stacks.quiz.index-1];
		index = Stacks.quiz.index-1;

		for (i = 0; i < 3; i++) {

			while (indices.indexOf(index) != -1)
			{ index = App.Utils.rand(0, Stacks.quiz.total-1); }

			indices.push(index);
			val = Stacks.quiz.flashcards[index].value[Stacks.quiz.question.flipped ? "front" : "back"];

			$(Array.prototype.pop.call($answers)).html(val);
		}
	};

	return Stacks;
});