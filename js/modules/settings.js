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

			if (extension != "json") { return App.Utils.notification("Only json files supported!"); }

			reader.readAsText(e.target.files[0]);
			reader.onload = function(e) {
				Settings.import_json(e.target.result);
				$target.val("");
			};
		},

		"click .button-reset-all": function(e) {

			App.Utils.dialog("Confirm", {

				text: "Do you really wish to delete your entire stacks, flashcards and statistics?",

				buttons: {
					ok: function() { Settings.reset(); },
					cancel: true
				}
			});
		},

		"click .button-reset-statistics": function(e) {
			App.Utils.dialog("Confirm", {

				text: "Do you really wish to delete your statistics?",

				buttons: {
					ok: function() { Settings.reset_statistics(); },
					cancel: true
				}
			});
		},

		"change input[type=checkbox]": function(e) {
			var what = App.$(e.currentTarget).attr("name");
			var status = App.$(e.currentTarget).is(":checked");
			Settings.set(what, status);
		}
	};

	/* ================= */
	/* ====== SET ====== */
	/* ================= */

	Settings.set = function(what, status) {

		var _settings = App.Utils.localStorage("settings") || {};
		_settings[what] = status;

		App.Utils.localStorage("settings", _settings);
		App._settings = _settings;
	}

	/* ========================= */
	/* ====== EXPORT JSON ====== */
	/* ========================= */

	Settings.export_json = function() {

		var anchor = document.createElement("a"),
		    json_data = {},
		    count = 0,
		    stackdata, interval, out;

		var check_fn = function() {

			if (count != Object.keys(stackdata).length) { return; }
			window.clearInterval(interval);

			out = JSON.stringify(json_data, null, "\t");

			if (App.isPhoneGap) {

				var date = new Date(),

				    year = date.getUTCFullYear(),
				    month = date.getUTCMonth()+1; month = month < 10 ? "0" + month : month,
				    day = date.getUTCDate(); day = day < 10 ? "0" + day : day,
				    
				    hours = date.getUTCHours(); hours = hours < 10 ? "0" + hours : hours,
				    minutes = date.getUTCMinutes(); minutes = minutes < 10 ? "0" + minutes : minutes,
				    seconds = date.getUTCSeconds(); seconds = seconds < 10 ? "0" + seconds : seconds,

				    dateString = year + "-" + month + "-" + day + "_" + hours + "-" + minutes + "-" + seconds,
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

		App.Flashcards.get(null, function(data) {

			stackdata = [];

			[].forEach.call(data, function(v) {
				if (!stackdata[v.value.stackID]) { stackdata[v.value.stackID] = []; }
				stackdata[v.value.stackID].push(v);
			});

			interval = window.setInterval(check_fn, 100);

			for (stackID in stackdata) {
				App.Stacks.getName(+stackID, function(stackname, id) {

					var data = stackdata[id];
					data = data.map(function(v) {
						return {
							front: v.value.front,
							back: v.value.back
						};
					});

					json_data[stackname] = data;

					count++;
				});
			}
		});
	};

	/* ========================= */
	/* ====== IMPORT JSON ====== */
	/* ========================= */

	Settings.import_json = function(json_data) {

		var error = false;

		if (typeof json_data != "object") {
			try {
				json_data = JSON.parse(json_data);
			} catch (err) {
				App.Utils.notification("Not a valid import file");
				error = true;
			}

			if (error) { return; }
		}

		var stack_names = [];
		var stack_keys = [];
		var count = 0;
		var length = Object.keys(json_data).length;

		var imported = [];
		var merged = [];
		var interval;

		var check_fn = function() {
			
			if (count < length) { return; }
			window.clearInterval(interval);

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

		App.Stacks.get(function(data) {
			
			data.forEach(function(v) {
				stack_names.push(v.value.name);
				stack_keys.push(v.key);
			});

			for (var stack in json_data) {

				if (stack_names.indexOf(stack) == -1) {

					App.Stacks.create(stack, function(key, stackname) {

						var flashcards = json_data[stackname];
						flashcards.forEach(function(v) { v.stackID = key; });
						App.Flashcards.add(flashcards, function() {
							imported.push("<li>" + stackname + "</li>");
							count++;
						});
					});

				} else {

					var stackID = stack_keys[stack_names.indexOf(stack)];

					App.Flashcards.getAll(stackID, function(data, stackID) {
						App.Stacks.getName(stackID, function(stackname) {

							var flashcards = json_data[stackname].filter(function(v, i) {
								
								var front_same, back_same;
								var unique = [].every.call(data, function(vv) {

									front_same = v.front == vv.value.front;
									back_same = v.back == vv.value.back;

									return !(front_same && back_same);
								});

								return unique;
							});

							if (!flashcards.length) { count++; return; }
							flashcards.forEach(function(v) { v.stackID = stackID; });

							App.Flashcards.add(flashcards, function() {
								merged.push("<li>" + stackname + "</li>");
								count++;
							});
						});
					});
				}
			}

			interval = window.setInterval(check_fn, 100);
		});
	};

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