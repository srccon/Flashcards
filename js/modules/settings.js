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

		"click #export": function(e) { Settings.export(); },
		"change #import input": function(e) {

			var reader = new FileReader();
			var fileName = e.target.files[0].name;
			var extension = fileName.substr(fileName.lastIndexOf('.') + 1);
			var $target = $(e.currentTarget);

			if (extension != "json") { return alert("Only json files supported!"); }

			reader.readAsText(e.target.files[0]);
			reader.onload = function(e) {
				Settings.import(e.target.result);
				$target.val("");
			};
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

	/* ==================== */
	/* ====== EXPORT ====== */
	/* ==================== */

	Settings.export = function() {

		var anchor = document.createElement("a"),
		    json_data = {},
		    count = 0,
		    stackdata, interval, out;

		var check_fn = function() {

			if (count != Object.keys(stackdata).length) { return; }
			window.clearInterval(interval);

			out = JSON.stringify(json_data, null, "\t");
			anchor.href = "data:application/json;charset=UTF-8;," + encodeURIComponent(out);
			anchor.download = "flashcards.json";

			if (App.isPhoneGap) {

				var date = new Date(),
				    year = date.getUTCFullYear(),
				    month = date.getUTCMonth()+1; month = month < 10 ? "0" + month : month,
				    day = date.getUTCDate(); day = day < 10 ? "0" + day : day,
				    hours = date.getUTCHours(); hours = hours < 10 ? "0" + hours : hours,
				    minutes = date.getUTCMinutes(); minutes = minutes < 10 ? "0" + minutes : minutes,
				    seconds = date.getUTCSeconds(); seconds = seconds < 10 ? "0" + seconds : seconds,

				    dateString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds,
				    path = "flashcards/flashcards " + dateString + ".json";

				App.Utils.PhonegapWriteFile(path, out, function() {
					alert("Created file in: /sdcard/" + path);
				});

			} else { App.Utils.fake_click(anchor); }
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

	/* ==================== */
	/* ====== IMPORT ====== */
	/* ==================== */

	Settings.import = function(json_data) {
		if (typeof json_data != "object") { json_data = JSON.parse(json_data); }

		var $stacks = $("#page-stacks li");
		var stack_names = [];
		var stack_keys = [];
		var count = 0;
		var length = Object.keys(json_data).length;

		var imported = [];
		var merged = [];
		var interval;

		var check_fn = function() {
			console.log(count, length);
			if (count >= length) {
				window.clearInterval(interval);

				var out = [];

				if (imported.length)
				{ out.push("== Imported ==\n\n" + imported.join("\n")); }

				if (merged.length)
				{ out.push("== Merged ==\n\n" + merged.join("\n")); }

				if (!imported.length && !merged.length)
				{ return alert("Everything up to date!"); }
		
				alert(out.join("\n\n"));
			}
		};

		$stacks.each(function() {
			stack_names.push($(this).text().trim());
			stack_keys.push(+$(this).attr("data-key"));
		});

		for (var stack in json_data) {

			if (stack_names.indexOf(stack) == -1) {

				App.Stacks.create(stack, function(key, stack) {

					var flashcards = json_data[stack];
					flashcards.forEach(function(v) { v.stackID = key; });
					App.Flashcards.add(flashcards, function() {
						imported.push(stack);
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

						if (!flashcards.length) { return; }
						flashcards.forEach(function(v) { v.stackID = stackID; });

						App.Flashcards.add(flashcards, function() {
							merged.push(stackname);
							count++;
						});
					});
				});
			}
		}

		interval = window.setInterval(check_fn, 100);
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