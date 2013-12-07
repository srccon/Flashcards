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

		"click": function(e) {

			var $target = App.$(e.target);
			if ($target.parent().hasClass("button-android-menu")) { $target = $target.parent(); }

			if ($target.hasClass("button-android-menu")) { return; }
			App.$(".actions").removeClass("android-menu");
		},

		"menubutton|click .button-android-menu": function(e) {

			var $actions = App.Router.$page.find(".actions");

			// if (e.type == "click") {
			// 	$actions.css({
			// 		top: "4em",
			// 		width: "70%",
			// 		bottom: "auto"
			// 	});
			// } else { $actions.removeAttr("style"); }

			$actions.toggleClass("android-menu");
		},

		// Stack link
		"click #stacks li": function(e) {
			location.hash = "page-stack:" + App.$(e.currentTarget).attr("data-key");
		},

		// Long touch to open settings
		"touchstart #stacks li": function(e) {
			if (!App.isMobile) { return; }

			var stackname = $(e.currentTarget).find("b").text();
			var stackID = $(e.currentTarget).attr("data-key");

			Stacks.touchTimeout = window.setTimeout(function() {

				if (confirm("Open Settings for \"" + stackname + "\" ?")) {
					window.location.hash = "page-stack-settings:" + stackID;
				}
			}, 1000);
		},

		"touchend|touchcancel|touchleave #stacks li": function(e) {
			if (!App.isMobile) { return; }
			window.clearTimeout(Stacks.touchTimeout);
		},

		// Create stack
		"click .button-new-stack": function(e) {
			var name = window.prompt("Stack name:", "Vocabulary 1");
			if (name) { Stacks.create(name); }
		},

		// Remove stack
		"click .button-remove-stack": function(e) {
			var stack = App.$("#page-stack h1").text();
			var stackID = +window.location.hash.split(":")[1];

			if (confirm("Remove \"" + stack + "\" and all of its flashcards?"))
			{ Stacks.remove(stackID); }
		},

		// Rename stack
		"click .button-rename-stack": function(e) {
			var stackID = +window.location.hash.split(":")[1];
			var stack = App.$("#page-stack-settings .stack-name").text();
			var name = window.prompt("Stack name:", stack);
			if (name) { Stacks.rename(stackID, name); }
		},

		// Practice stack
		"click .button-practice": function(e) {
			var stackID = +window.location.hash.split(":")[1];
			location.hash = "page-practice:" + stackID;
		},

		// Exit practice
		"click .button-exit-practice": function(e) {
			delete Stacks.practice.flashcards;
			delete Stacks.practice.index;
			window.history.back();
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
			location.hash = "page-stack-settings:" + stackID;
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
		}
	};

	/* ========================= */
	/* ====== UPDATE VIEW ====== */
	/* ========================= */

	Stacks.updateView = function() {

		Stacks.get(function(stacks) {

			var $stacks = App.$("#stacks");
			$stacks.html("");

			if (stacks.length) {

				$stacks.parent().find(".note").hide();

				[].forEach.call(stacks, function(v) {

					Stacks.countFlashcards(v.key, function(num) {
						$stacks.append(
							"<li class='stack' data-key='" + v.key + "'>" +
								"<span class='fa fa-tags' style='margin-right: 10px;'></span>" +
								" <b>" + v.value.name + "</b> " +
								"<span class='fa fa-arrow-right'></span>" +
								"<span class='count'>" + num + " Cards</span>" +
							"</li>"
						);
					});
				});

			} else { $stacks.parent().find(".note").show(); }
		});
	};

	/* ====================== */
	/* ====== GET NAME ====== */
	/* ====================== */

	Stacks.getName = function(id, callback) {
		App.DB.getData("App", "Stacks", id, function(data) {
			if (!data) { return; }
			callback(data.name, id);
		});
	};

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Stacks.get = function(callback) {
		App.DB.getData("App", "Stacks", null, callback);
	};

	/* ============================== */
	/* ====== COUNT FLASHCARDS ====== */
	/* ============================== */

	Stacks.countFlashcards = function(stackID, callback) {
		App.DB.countObjectStoreEntries("App", "Flashcards", ["stackID", stackID], callback);
	};

	/* ==================== */
	/* ====== CREATE ====== */
	/* ==================== */

	Stacks.create = function(name, callback) {

		name = App.Utils.escapeHTML(name);

		App.DB.addData("App", "Stacks", { name: name }, function(e) {

			var key = e.target.result;
			if (!App.$(".stack").length) { $("#page-stacks .note").hide(); }

				App.$("#stacks").append(
					"<li class='stack' data-key='" + key + "'>" +
						"<span class='fa fa-tags' style='margin-right: 10px;'></span>" +
						" <b>" + name + "</b> " +
						"<span class='fa fa-arrow-right' style='float: right;'></span>" +
					"</li>"
				);

			if (callback) { callback(key, name) }
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

	Stacks.rename = function(id, name) {
		App.DB.updateData("App", "Stacks", id, { name: name }, function(e) {
			App.$(".stack[data-key=" + id + "] b").html(name);
			App.$("#page-stack-settings .stack-name").html(name);
		});
	};

	/* ====================== */
	/* ====== PRACTICE ====== */
	/* ====================== */

	Stacks.practice = function(id) {

		// Fetch flashcards
		if (id !== undefined) {

			App.Flashcards.getAll(id, function(data) {

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
			});

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

			window.location.hash = "page-stack:" + Stacks.practice.id;
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

	return Stacks;
});