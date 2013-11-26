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

		"click #export_json": function(e) { Settings.export("json"); },
		"click #export_txt": function(e) { Settings.export("txt"); },
		"click #import": function(e) { Settings.import(); },

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

	Settings.export = function(type) {

		var anchor = document.createElement("a"),
		    json_data = {},
		    count = 0,
		    stackdata, interval, out;

		var check_fn = function() {

			if (count != Object.keys(stackdata).length) { return; }
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
						out	+= "\t" + v.value.front + " - " + v.value.back + "\r\n";
					});

					out += "\r\n";
				}

				anchor.href = "data:text/plain;charset=UTF-8;," + encodeURIComponent(out);
				anchor.download = "flashcards.txt";
			}

			if (App.isPhoneGap) {

				var date = new Date(),
				    year = date.getUTCFullYear(),
				    month = date.getUTCMonth()+1; month = month < 10 ? "0" + month : month,
				    day = date.getUTCDate(); day = day < 10 ? "0" + day : day,
				    hours = date.getUTCHours(); hours = hours < 10 ? "0" + hours : hours,
				    minutes = date.getUTCMinutes(); minutes = minutes < 10 ? "0" + minutes : minutes,
				    seconds = date.getUTCSeconds(); seconds = seconds < 10 ? "0" + seconds : seconds,

				    dateString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds,
				    path = "flashcards/flashcards " + dateString + "." + type;

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
					json_data[stackname] = stackdata[id];
					count++;
				});
			}
		});
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