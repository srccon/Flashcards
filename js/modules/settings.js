define(function() {

	var Settings = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Settings.initialize = function() {

		App = require("app");
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Settings.events = {

		"click #export_json": function(e) {
			Settings.export("json");
		},

		"click #export_txt": function(e) {
			Settings.export("txt");
		},

		"click #import": function(e) {
			Settings.import();
		},

		"click #reset_all": function(e) {
			if (confirm("Do you really wish to delete your entire stacks, flashcards and statistics?")) {
				Settings.reset();
			}
		},

		"click #reset_statistics": function(e) {
			if (confirm("Do you really wish to delete your statistics?")) {
				Settings.reset_statistics();
			}
		},
	};

	/* ==================== */
	/* ====== EXPORT ====== */
	/* ==================== */

	Settings.export = function(type) {

		var stacks = App.Stacks.list(),
		    json_data = {},
		    count = 0,
		    interval,
		    out,
		    anchor = document.createElement("a");

		[].forEach.call(stacks, function(v) {
			App.Stacks.flashcards(v, function(data) {
				json_data[v] = data;
				count++;
			}, true);
		});

		interval = window.setInterval(function() {
			if (count == stacks.length) {
				window.clearInterval(interval);

				if (type == "json") {

					out = JSON.stringify(json_data, null, "\t");
					anchor.href = "data:application/json;charset=UTF-8;," + encodeURIComponent(out);
					anchor.download = "flashcards.json";

				} else if (type == "txt") {

					out = "";

					for (var stack in json_data) {
						out += stack + "\r\n\r\n";

						json_data[stack].forEach(function(v) {
							out	+= "\t" + v.front + " - " + v.back + "\r\n";
						});

						out += "\r\n";
					}
					anchor.href = "data:text/plain;charset=UTF-8;," + encodeURIComponent(out);
					anchor.download = "flashcards.txt";
				}

				App.Utils.fake_click(anchor);
			}
		}, 100);
	};

	/* ==================== */
	/* ====== IMPORT ====== */
	/* ==================== */

	Settings.import = function() {

	};

	/* =================== */
	/* ====== RESET ====== */
	/* =================== */

	Settings.reset = function() {
		window.indexedDB.deleteDatabase('Stacks');
		window.indexedDB.deleteDatabase('Statistics');
		window.localStorage.clear();
		window.location.reload();
	};

	/* ============================== */
	/* ====== RESET STATISTICS ====== */
	/* ============================== */

	Settings.reset_statistics = function() {
		window.indexedDB.deleteDatabase('Statistics');
		window.location.reload();
	};

	return Settings;
})