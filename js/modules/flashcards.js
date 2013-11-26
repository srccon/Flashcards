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
			var id = +window.location.hash.split(":")[1];
			location.hash = "page-new-flashcard:" + id;
		},

		// Add button
		"click #add-flashcard": function(e) {

			var data = {
				stackID: +window.location.hash.split(":")[1],
				front: $("#page-new-flashcard textarea[name=front]").val(),
				back: $("#page-new-flashcard textarea[name=back]").val()
			};

			Flashcards.add(data);
		},

		// Remove button
		"click .remove-flashcard": function(e) {

			var $parent = $(e.currentTarget).parents("tr");
			var key = +$parent.attr("data-key");

			var front = $parent.find("td:eq(0)").text();
			var back = $parent.find("td:eq(1)").text();

			if (confirm("Remove " + front + " - " + back + "?"))
			{ Flashcards.remove(key); }
		},

		// Edit button
		"click .edit-flashcard": function(e) {
			var stackID = +window.location.hash.split(":")[1];
			var key = $(e.currentTarget).parents("tr").attr("data-key");
			location.hash = "page-edit-flashcard:" + stackID + ":" + key;
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
			callback(data);
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

	/* ================= */
	/* ====== ADD ====== */
	/* ================= */

	Flashcards.add = function(data) {

		App.DB.addData("App", "Flashcards", data, function(e) {
			if (data.length) { return; }
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

	Flashcards.remove = function(key) {

		var count = 0;
		var fn = function(key) {

			if (count == keys.length-1) {
				if (keys.length == 1) { App.$("tr[data-key=" + key + "]").remove(); }
			}

			count++;
		};

		var keys = typeof key == "object" && key.length ? key : [key];

		keys.forEach(function(key) {
			App.DB.removeData("App", "Flashcards", key, function() { fn(key); });
		});
	};

	return Flashcards;
})