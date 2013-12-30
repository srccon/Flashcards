define(function() {

	var Settings = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Settings.initialize = function() {

		App = require("app");
		var setting, $elem;

		// Apply settings to UI
		for (setting in App._settings) {
			$elem = App.$("input[name=" + setting + "]");
			if (typeof App._settings[setting] == "boolean" && $elem.length)
			{ $elem.attr("checked", App._settings[setting]); }
		}
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Settings.events = {

		"click .button-export": function(e) { Settings.export_json(); },

		"click .button-import": function(e) {
			if (!App.isPhoneGap) { return; }
			window.location.hash = "page-file-browser";
		},

		"change .button-import input": function(e) {

			if (App.isPhoneGap) { return; }

			var reader = new FileReader();
			var fileName = e.target.files[0].name;
			var extension = fileName.substr(fileName.lastIndexOf('.') + 1);
			var $target = $(e.currentTarget);

			if (extension != "json") { return App.Utils.notification("Only json files supported"); }

			reader.readAsText(e.target.files[0]);
			reader.onload = function(e) {
				Settings.import_json(e.target.result);
				$target.val("");
			};
		},

		"click .button-reset-all": function(e) {
			App.Utils.dialog("Confirm", {
				content: "Do you really wish to delete your entire stacks, flashcards and statistics?",
				buttons: {
					ok: function() { Settings.reset(); },
					cancel: true
				}
			});
		},

		"click .button-reset-statistics": function(e) {
			App.Utils.dialog("Confirm", {
				content: "Do you really wish to delete your statistics?",
				buttons: {
					ok: function() { Settings.reset_statistics(); },
					cancel: true
				}
			});
		},

		"change #page-settings input[type=checkbox]": function(e) {
			var what = App.$(e.currentTarget).attr("name");
			var status = App.$(e.currentTarget).is(":checked");
			Settings.set(what, status);
		},

		// Return to settings
		"click .button-return-settings": function(e) {
			window.location.hash = "#page-settings";
		},
	};

	/* ================= */
	/* ====== SET ====== */
	/* ================= */

	Settings.set = function(what, status) {

		var _settings = App.Utils.localStorage("settings") || {};
		_settings[what] = status;

		App.Utils.localStorage("settings", _settings);
		App._settings = _settings;
	};

	/* ========================= */
	/* ====== EXPORT JSON ====== */
	/* ========================= */

	Settings.export_json = (function() {

		var anchor = document.createElement("a"),
		    json_data, stackdata, count, interval,
		    
		    fn_export, fn_process,
		    fn_check, fn_serve;

		fn_export = function() {

			App.Flashcards.get(null, function(data) {

				var stackID;
				json_data = {};
				stackdata = [];
				count = 0;

				[].forEach.call(data, function(v) {
					if (!stackdata[v.value.stackID]) { stackdata[v.value.stackID] = []; }
					stackdata[v.value.stackID].push(v);
				});

				interval = window.setInterval(fn_check, 100);

				for (stackID in stackdata)
				{ App.Stacks.get(+stackID, fn_process); }
			});
		};

		fn_process = function(stack) {

			var data = stackdata[stack.id];

			data = data.map(function(v) {
				return {
					front: v.value.front,
					back: v.value.back
				};
			});

			if (!json_data[stack.category]) { json_data[stack.category] = {}; }
			json_data[stack.category][stack.name] = data;

			count++;
		};

		fn_check = function() {

			if (count != Object.keys(stackdata).length) { return; }
			window.clearInterval(interval);
			fn_serve();
		};

		fn_serve = function() {
			var out = JSON.stringify(json_data, null, "\t");

			if (App.isPhoneGap) {

				var date = new Date(),

				    year = date.getUTCFullYear(),
				    month = date.getUTCMonth()+1,
				    day = date.getUTCDate(),
				    
				    hours = date.getUTCHours(),
				    minutes = date.getUTCMinutes(),
				    seconds = date.getUTCSeconds(),
				    dateString;

				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
				hours = hours < 10 ? "0" + hours : hours;
				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				dateString = year + "-" + month + "-" + day + "_" + hours + "-" + minutes + "-" + seconds;
				path = "flashcards/flashcards_" + dateString + ".json";

				App.Utils.PhoneGap.writeFile(path, out, function() {
					App.Utils.notification("Created file in: /sdcard/" + path);
				});

			} else {
				anchor.href = "data:application/json;charset=UTF-8;," + encodeURIComponent(out);
				anchor.download = "flashcards.json";
				anchor.click();
			}
		};

		return fn_export;

	}());

	/* ========================= */
	/* ====== IMPORT JSON ====== */
	/* ========================= */

	Settings.import_json = (function() {

		var json_data, imported, merged,
		    count, stack_length, interval,

		    fn_import, fn_stack_create,
		    fn_merge, fn_check, fn_report;


		fn_import = function(data) {

			json_data = data;

			// Parse json data
			if (typeof json_data != "object") {
				try {
					json_data = JSON.parse(json_data);
				} catch (err) {
					App.Utils.notification("An error occured while parsing the json file");
					return;
				}
			}

			var stack_names = [], stack_keys = [];

			imported = [];
			merged = [];
			count = 0;
			stack_length = 0;

			Object.keys(json_data).forEach(function(v) {
				stack_length += Object.keys(json_data[v]).length;
			});

			App.Stacks.getAll(function(data) {

				var category, stack;
				
				data.forEach(function(v) {
					stack_names.push(v.value.name);
					stack_keys.push(v.key);
				});

				interval = window.setInterval(fn_check, 100);

				for (category in json_data) {
					for (stack in json_data[category]) {

						// Stack doesn't exist, create it
						if (stack_names.indexOf(stack) == -1) {
							App.Stacks.create(category, stack, fn_stack_create);

						// Stack exists, merge them
						} else {

							var stackID = stack_keys[stack_names.indexOf(stack)];

							// Compare flashcards
							App.Flashcards.getAll(stackID, fn_merge);
						}
					}
				}
			});
		};

		fn_stack_create = function(key, category, stackname) {

			var flashcards = json_data[category][stackname];
			flashcards.forEach(function(v) { v.stackID = key; });

			App.Flashcards.add(flashcards, function() {
				imported.push("<li>" + category + " // " + stackname + "</li>");
				count++;
			});
		};

		fn_merge = function(data, stackID) {
			App.Stacks.get(stackID, function(stack) {

				// Sort out equal flashcards
				var flashcards = json_data[stack.category][stack.name].filter(function(v, i) {
					
					var front_same, back_same;
					var unique = [].every.call(data, function(vv) {

						front_same = v.front == vv.value.front;
						back_same = v.back == vv.value.back;

						return !(front_same && back_same);
					});

					return unique;
				});

				if (!flashcards.length) { return count++; }
				flashcards.forEach(function(v) { v.stackID = stackID; });

				// Add new flashcards
				App.Flashcards.add(flashcards, function() {
					merged.push("<li>" + stack.name + "</li>");
					count++;
				});
			});
		};

		fn_check = function() {

			if (count < stack_length) { return; }
			window.clearInterval(interval);

			fn_report();
		};

		fn_report = function() {

			var out = [];

			if (imported.length)
			{ out.push("<b>Imported</b>:<br><br><ul>" + imported.join("") + "</ul>"); }

			if (merged.length)
			{ out.push("<b>Merged</b>:<br><br><ul>" + merged.join("") + "</ul>"); }

			if (!imported.length && !merged.length)
			{ return App.Utils.notification("Everything up to date!"); }
	
			App.Utils.dialog("Import", out.join("<br><br>"));
			window.location.hash = "page-settings";
		};

		return fn_import;

	}());

	/* =================== */
	/* ====== RESET ====== */
	/* =================== */

	Settings.reset = function() {
		window.indexedDB.deleteDatabase("App");
		window.localStorage.clear();
		window.location.reload();
	};

	/* ============================== */
	/* ====== RESET STATISTICS ====== */
	/* ============================== */

	Settings.reset_statistics = function() {
		App.DB.deleteObjectStore("App", "Statistics", null, function() {
			App.DB.createObjectStore("App", "Statistics", function(objectStore) { objectStore.createIndex("stackID", "stackID", { unique: false }); }, function() {

				window.location.reload();
			});
		});
	};

	return Settings;
});