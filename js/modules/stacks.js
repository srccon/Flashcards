define(function() {

	var Stacks = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Stacks.initialize = function() {

		App = require("app");
		Stacks.updateView();
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Stacks.events = {

		"click #stacks li": function(e) {
			location.hash = "page-stack:" + App.$(e.currentTarget).attr("data-key");
		},

		"click #new-stack": function(e) {
			var name = window.prompt("Stack name:", "Vocabulary 1");
			if (name) { Stacks.create(name); }
		},

		"click #remove-stack": function(e) {
			var stack = App.$("#page-stack h1").text();
			var id = +window.location.hash.split(":")[1];
			if (confirm("Remove \"" + stack + "\" and all of its flashcards?"))
			{ Stacks.remove(id); }
		},

		"click #rename-stack": function(e) {

			var id = +window.location.hash.split(":")[1],
			    stack = App.$("#page-stack h1").text(),
			    name = window.prompt("Stack name:", stack);

			if (name) { Stacks.rename(id, name); }
		},

		"click #practice": function(e) {
			var id = +window.location.hash.split(":")[1]
			location.hash = "page-practice:" + id;
		},

		"click #exit-practice": function(e) {
			delete Stacks.practice.flashcards;
			delete Stacks.practice.index;
			window.history.back();
		},
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

				// List all stacks
				[].forEach.call(stacks, function(v) {
					$stacks.append("<li class='stack' data-key='" + v.key + "'><b>" + v.value.name + "</b> <span class='fa fa-arrow-right' style='float: right;'></span></li>");
				});
			} else {
				$stacks.parent().find(".note").show();
			}
		});
	};

	/* ====================== */
	/* ====== GET NAME ====== */
	/* ====================== */

	Stacks.getName = function(id, callback) {
		App.DB.getData("App", "Stacks", id, function(data) {
			callback(data.name, id);
		});
	};

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Stacks.get = function(callback) {
		App.DB.getData("App", "Stacks", null, function(data) {
			callback(data);
		});
	};

	/* ==================== */
	/* ====== CREATE ====== */
	/* ==================== */

	Stacks.create = function(name, callback) {
		App.DB.addData("App", "Stacks", { name: name }, function(e) {

			var key = e.target.result;
			if (!App.$(".stack").length) { $("#page-stacks .note").hide(); }

			App.$("#stacks").append("<li class='stack' data-key='" + key + "'><b>" + name + "</b> <span class='fa fa-arrow-right' style='float: right;'></span></li>");
			if (callback) { callback(key) }
		});
	};

	/* ==================== */
	/* ====== REMOVE ====== */
	/* ==================== */

	Stacks.remove = function(id) {
		App.Flashcards.getAll(id, function(flashcards) {

			var keys = [].map.call(flashcards, function(v) { return v.key; });
			App.Flashcards.remove(keys);

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
			App.$("#page-stack h1").html(name);
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
				
				if (App._settings.shuffle_flashcards) { data.shuffle(); }
				if (App._settings.switch_front_back) {
					data.forEach(function(v) {
						var front = v.front;
						v.front = v.back;
						v.back = front;
					});
				}

				Stacks.practice.flashcards = data;
				Stacks.practice();
			});

			return;
		}

		var flashcard = Stacks.practice.flashcards[Stacks.practice.index++];

		// End reached
		if (!flashcard) {
			delete Stacks.practice.flashcards;

			App.Statistics.registerPracticeSession(
				Stacks.practice.id,
				Stacks.practice.score,
				Stacks.practice.total
			);

			window.history.back();
			return;
		}

		if (App._settings.switch_front_back_randomly && Math.round(Math.random())) {

			var front = flashcard.value.front;
			flashcard.front = flashcard.value.back;
			flashcard.back = front;
		}
		
		// Reset flashcard view
		App.$("#practice-buttons").hide();
		App.$("#flashcard .front").css({ rotateX: 5 });
		App.$("#flashcard .back").css({ rotateX: 180 });
		App.$("#flashcard-shadow").css({ rotateX: 0 });

		App.$("#flashcard .front").html(flashcard.value.front);
		App.$("#flashcard .back").html(flashcard.value.back);
	};

	return Stacks;
})