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

		// New button
		"click #new-flashcard": function(e) {

			var stack = $("#page-stack h1").text();
			location.hash = "page-new-flashcard:" + stack;
		},

		// Add button
		"click #add-flashcard": function(e) {

			var stack = $("#page-new-flashcard h1").text();
			var data = {
				front: $("#page-new-flashcard textarea[name=front]").val(),
				back: $("#page-new-flashcard textarea[name=back]").val()
			};

			Flashcards.add(stack, data);
		},

		// Remove button
		"click .remove-flashcard": function(e) {

			var stack = $("#page-stack h1").text();
			var $parent = $(e.currentTarget).parents("tr");
			var key = +$parent.attr("data-key");

			var front = $parent.find("td:eq(0)").text();
			var back = $parent.find("td:eq(1)").text();

			if (confirm("Remove " + front + " - " + back + "?"))
			{ Flashcards.remove(stack, key); }
		},

		// Edit button
		"click .edit-flashcard": function(e) {

			var stack = $("#page-stack h1").text();
			var key = $(e.currentTarget).parents("tr").attr("data-key");

			location.hash = "page-edit-flashcard:" + stack + ":" + key;
		},

		// Update button
		"click #update-flashcard": function(e) {

			var stack = $("#page-edit-flashcard h1").text();
			var key = App.Router.$page.attr("data-key");

			var data = {
				front: $("#page-edit-flashcard textarea[name=front]").val(),
				back: $("#page-edit-flashcard textarea[name=back]").val()
			};

			Flashcards.update(stack, key, data);
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

		// Practice button functionality
		"click #practice": function(e) {

			var stack = $("#page-stack h1").text();
			location.hash = "page-practice:" + stack;
		},

		// Practice buttons
		"click #practice-buttons .button": function(e) {

			if ($(e.currentTarget).hasClass("green"))
			{ App.Stacks.practice.score++; }

			App.Stacks.practice();
		}
	};

	/* ================== */
	/* ====== LIST ====== */
	/* ================== */

	Flashcards.list = function(stack, callback) {
		
		var transaction = App.DB.Stacks.transaction(stack);
		var objectStore = transaction.objectStore(stack);
		var pairs = [];

		objectStore.openCursor().onsuccess = function(e) {
			var cursor = e.target.result;

			if (cursor) {

				pairs.push({
					key: cursor.key,
					front: cursor.value.front,
					back: cursor.value.back
				});

				cursor.continue();

			} else { callback(pairs); }
		};
	};

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Flashcards.get = function(stack, key, callback) {
		
		App.DB.getData("Stacks", stack, key, function(data) {
			callback(data);
		});
	};

	/* ================= */
	/* ====== ADD ====== */
	/* ================= */

	Flashcards.add = function(stack, data) {

		App.DB.addData("Stacks", stack, data, function(e) {

			App.$("#page-new-flashcard textarea[name=front]").val("");
			App.$("#page-new-flashcard textarea[name=back]").val("");
		});
	};

	/* ==================== */
	/* ====== UPDATE ====== */
	/* ==================== */

	Flashcards.update = function(stack, key, newData) {

		App.DB.updateData("Stacks", stack, key, newData, function() {

			window.history.back();
		});
	};

	/* ==================== */
	/* ====== REMOVE ====== */
	/* ==================== */

	Flashcards.remove = function(stack, key) {

		App.DB.removeData("Stacks", stack, key, function() {

			App.$("tr[data-key=" + key + "]").remove();
		});
	};

	return Flashcards;
})