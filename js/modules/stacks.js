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

		// Stack link functionality
		"click #stacks li": function(e) {
			location.hash = "page-stack:" + $(e.currentTarget).text().trim();
		},

		// New stack button functionality
		"click #new-stack": function(e) {
			var name = window.prompt("Stack name:", "Vocabulary 1");
			if (name) { Stacks.create(name); }
		},

		// New stack button functionality
		"click #exit-practice": function(e) {
			delete Stacks.practice.flashcards;
			delete Stacks.practice.index;
			window.history.back();
		},

		// New stack button functionality
		"click #remove-stack": function(e) {
			var stack = $("#page-stack h1").text();
			if (confirm("Remove \"" + stack + "\" and all of its flashcards?"))
			{ Stacks.remove(stack); }
		}
	};

	/* ========================= */
	/* ====== UPDATE VIEW ====== */
	/* ========================= */

	Stacks.updateView = function() {

		var stacks = Stacks.list();
		var $stacks = App.$("#stacks");

		$stacks.html("");

		if (stacks.length) {

			$stacks.parent().find(".note").hide();

			// List all stacks
			[].forEach.call(stacks, function(v) {

				$stacks.append("<li class='stack'><b>" + v + "</b> <span class='fa fa-arrow-right' style='float: right;'></span></li>");
			});
		} else {
			$stacks.parent().find(".note").show();
		}
	};

	/* ==================== */
	/* ====== CREATE ====== */
	/* ==================== */

	Stacks.create = function(name) {

		App.DB.createObjectStore("Stacks", name, null, function(objectStore) {

			if (!App.DB.Stacks.objectStoreNames.length) { App.Router.$page.find(".note").remove(); }
			App.$("#stacks").append("<li class='stack'><b>" + name + "</b></li>");
		});

		App.DB.createObjectStore("Statistics", name);
	};

	/* ================== */
	/* ====== LIST ====== */
	/* ================== */

	Stacks.list = function() {
		return App.DB.Stacks.objectStoreNames;
	};

	/* ==================== */
	/* ====== REMOVE ====== */
	/* ==================== */

	Stacks.remove = function(stack) {

		App.DB.deleteObjectStore("Stacks", stack, null, function(e) {
			console.log(App.DB.Stacks.objectStoreNames);
			Stacks.updateView();
			window.location.hash = "page-stacks";
		});
	};

	/* ======================== */
	/* ====== FLASHCARDS ====== */
	/* ======================== */

	Stacks.flashcards = function(stack, callback, nokey) {
		
		var transaction = App.DB.Stacks.transaction(stack);
		var objectStore = transaction.objectStore(stack);
		var pairs = [];

		// Collect all flashcards
		objectStore.openCursor().onsuccess = function(e) {

			var cursor = e.target.result, data;

			if (cursor) {

				data = {
					key: cursor.key,
					front: cursor.value.front,
					back: cursor.value.back
				};

				if (nokey) { delete data.key; }
				pairs.push(data);

				cursor.continue();

			} else { callback(pairs); }
		};
	};

	/* ====================== */
	/* ====== PRACTICE ====== */
	/* ====================== */

	Stacks.practice = function(stack) {

		// Fetch flashcards
		if (!Stacks.practice.flashcards) {

			var flashcards = Stacks.flashcards(stack, function(data) {

				Stacks.practice.stack = stack;
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
				Stacks.practice.stack,
				Stacks.practice.score,
				Stacks.practice.total
			);

			window.history.back();
			return;
		}

		if (App._settings.switch_front_back_randomly && Math.round(Math.random())) {
			var front = flashcard.front;
			flashcard.front = flashcard.back;
			flashcard.back = front;
		}
		
		// Reset flashcard view
		$("#practice-buttons").hide();
		$("#flashcard .front").css({ rotateX: 5 });
		$("#flashcard .back").css({ rotateX: 180 });
		$("#flashcard-shadow").css({ rotateX: 0 });

		$("#flashcard .front").html(flashcard.front);
		$("#flashcard .back").html(flashcard.back);
	};

	return Stacks;
})