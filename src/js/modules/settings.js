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

		if (App.Utils.localStorage("reset") == "true") {
			App.Utils.localStorage("reset", "false");
			App.Utils.notification("Reset successful");
		}
	};

	/* ==================== */
	/* ====== EVENTS ====== */
	/* ==================== */

	Settings.events = {

		"click .button-export": function(e) { Settings.export_json(); },

		"click .button-import": function(e) {
			if (!App.isCordova) { return; }
			e.preventDefault();
			window.location.hash = "page-file-browser";
		},

		"change .button-import input": function(e) {

			if (App.isCordova) {
				e.preventDefault();
				return;
			}

			var reader = new FileReader();
			var fileName = e.target.files[0].name;
			var extension = fileName.substr(fileName.lastIndexOf('.') + 1);
			var $target = App.$(e.currentTarget);

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
		    json_data, stackdata, stackdata_length, count,
		    interval, _callback, _parse,
		    
		    fn_export, fn_process,
		    fn_check, fn_serve;

		fn_export = function(callback) {

			_callback = callback;

			if (!callback)
			{ App.Utils.notification("Exporting..."); }

			App.Flashcards.get(null, function(data) {

				var stackID;
				json_data = {};
				stackdata = {};
				count = 0;

				[].forEach.call(data, function(v) {
					if (!stackdata[v.value.stackID]) { stackdata[v.value.stackID] = []; }
					stackdata[v.value.stackID].push(v);
				});

				stackdata_length = Object.keys(stackdata).length;

				for (stackID in stackdata)
				{ App.Stacks.get(+stackID, fn_process); }
			});
		};

		fn_process = function(stack) {

			var data = stackdata[stack.id],
			    prefs = App._settings.translation_preferences[stack.id];

			data = data.map(function(v) {

				if (_callback) { return v; }

				var card = {
					front: v.value.front,
					back: v.value.back,
					tags: v.value.tags,
					score: v.value.score
				};

				if (typeof v.value.tags == "string") {
					card.tags = JSON.parse(v.value.tags);
					if (typeof card.tags == "string") { card.tags = [card.tags]; }
				}

				if (typeof v.value.score == "string") {
					card.score = JSON.parse(v.value.score);
				}

				if (!card.tags || !card.tags.join("").length) { delete card.tags; }
				if (!card.score) { delete card.score; }

				return card;
			});

			if (prefs) { data.push(prefs.from + "|" + prefs.to); }

			if (!json_data[stack.category]) { json_data[stack.category] = {}; }
			json_data[stack.category][stack.name] = data;

			count++;
			fn_check();
		};

		fn_check = function() {
			if (count != stackdata_length) { return; }
			fn_serve();
		};

		fn_serve = function() {

			if (typeof _callback == "function") { return _callback(json_data); }
			var out = JSON.stringify(json_data, null, "\t");

			if (App.isCordova) {

				var date = new Date(),

				    year = date.getFullYear(),
				    month = date.getMonth()+1,
				    day = date.getUTCDate(),
				    
				    hours = date.getHours(),
				    minutes = date.getMinutes(),
				    seconds = date.getUTCSeconds(),
				    dateString;

				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
				hours = hours < 10 ? "0" + hours : hours;
				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				dateString = year + "-" + month + "-" + day + "_" + hours + "-" + minutes + "-" + seconds;
				path = dateString + ".json";

				App.Utils.Cordova.writeFile(path, out, function() {
					App.Utils.notification("Created file in: Documents/Flashcards/" + path);
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

			App.Utils.notification("Importing...");

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

				for (category in json_data) {
					for (stack in json_data[category]) {

						// Stack doesn't exist, create it
						if (stack_names.indexOf(stack) == -1) {
							App.Stacks.create(category, stack, fn_stack_create, true);

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

			flashcards = flashcards.filter(function(v) {

				if (typeof v == "string") {
					var prefs = v.split("|");
					App._settings.translation_preferences[key] = {
						from: prefs[0],
						to: prefs[1]
					};

					return false;
				}

				v.stackID = key;
				v.tags = JSON.stringify(v.tags);
				v.score = JSON.stringify(v.score);

				return true;
			});

			App.Flashcards.add(flashcards, function() {
				imported.push("<li>" + category + " // " + stackname + "</li>");
				count++;
				fn_check();
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

				if (!flashcards.length) { count++; return fn_check(); }

				flashcards.forEach(function(v) {
					v.stackID = stackID;
					v.tags = JSON.stringify(v.tags);
					v.score = JSON.stringify(v.score);
				});

				// Add new flashcards
				App.Flashcards.add(flashcards, function() {
					merged.push("<li>" + stack.category + " // " + stack.name + "</li>");
					count++;
					fn_check();
				});
			});
		};

		fn_check = function() {
			if (count < stack_length) { return; }
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
	
			App.Utils.localStorage("settings", App._settings);
			App.Utils.dialog("Import", out.join("<br><br>"));
			window.location.hash = "page-settings";
		};

		return fn_import;

	}());

	/* =================== */
	/* ====== RESET ====== */
	/* =================== */

	Settings.reset = function() {

		var request, interval;

		App.Utils.notification("Resetting...");
		window.localStorage.clear();

		App.DB.App.close();
		request = window.indexedDB.deleteDatabase("App");

		interval = window.setInterval(function() {
			if (request.readyState != "done" && !window.shimIndexedDB) { return; }
			window.clearInterval(interval);
			App.Utils.localStorage("reset", "true");
			window.location.reload();
		}, 250);
	};

	/* ============================== */
	/* ====== RESET STATISTICS ====== */
	/* ============================== */

	Settings.reset_statistics = function() {

		App.Utils.notification("Resetting...");

		App.DB.deleteObjectStore("App", "Statistics", null, function() {
			App.DB.createObjectStore("App", "Statistics", function(objectStore) { objectStore.createIndex("stackID", "stackID", { unique: false }); }, function() {
				App.Utils.localStorage("reset", "true");
				window.location.reload();
			});
		});
	};

	return Settings;
});