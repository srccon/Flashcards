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
			var id = +window.location.hash.split(":")[1];
			location.hash = "page-flashcard-new:" + id;
		},

		// Add flashcard(s)
		"click .flashcard-add": function(e) {

			var data = {
				stackID: +window.location.hash.split(":")[1],
				front: $("#page-flashcard-new textarea[name=front]").val(),
				back: $("#page-flashcard-new textarea[name=back]").val()
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

	/* ==================== */
	/* ====== REMOVE ====== */
	/* ==================== */

	Flashcards.remove = function(key, no_UI) {

		var keys = typeof key == "object" && key.length ? key : [key], count = 0;
		var fn = function(key) {
			if (!no_UI) { App.$("tr[data-key=" + key + "]").remove(); }
			count++;
		};

		// Remove key(s)
		keys.forEach(function(key) {
			App.DB.removeData("App", "Flashcards", key, function() { fn(key); });
		});
	};

	return Flashcards;
});