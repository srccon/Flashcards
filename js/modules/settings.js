define(["dropbox"], function(Dropbox) {

	var Settings = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Settings.initialize = function() {

		App = require("app");

		var setting, $elem;

		for (setting in App._settings) {
			$elem = App.$("input[name=" + setting + "]");
			if (typeof App._settings[setting] == "boolean" && $elem.length)
			{ $elem.attr("checked", App._settings[setting]); }
		}

		Settings.initDropbox();
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

		"click #unsync_dropbox": function(e) {
			Settings.dropbox.client.signOut();
			$("#unsync_dropbox").hide();
			$("#sync_dropbox").show();
		},

		"click #sync_dropbox": function(e) {

			Settings.dropbox.client.authenticate();
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

			if (count != stacks.length) { return }
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

			if (App.isPhoneGap) {

				var date = new Date();
				var y = date.getUTCFullYear();
				var m = date.getUTCMonth()+1; m = m < 10 ? "0" + m : m;
				var d = date.getUTCDate(); d = d < 10 ? "0" + d : d;
				var s = date.getUTCSeconds(); s = s < 10 ? "0" + s : s;

				var dateString = y + "-" + m + "-" + d + "-" + s;
				var path = "flashcards/export-" + dateString + "." + type;

				App.Utils.PhonegapWriteFile(path, out, function() {
					alert("Created file in: /sdcard/" + path);
				});

			} else {

				App.Utils.fake_click(anchor);
			}
		}, 100);
	};

	/* ========================== */
	/* ====== INIT DROPBOX ====== */
	/* ========================== */

	Settings.initDropbox = function() {

		Settings.dropbox = {};
		Settings.dropbox.client = new Dropbox.Client({ key: "njhr3s6wjjbmfsv" });
		Settings.dropbox.client.authenticate({ interactive: false });

		if (Settings.dropbox.client.isAuthenticated()) {

			Settings.dropbox.isAuthenticated = true;

			$("#sync_dropbox").hide();
			$("#unsync_dropbox").show();

			Settings.dropbox.client.getDatastoreManager().openDefaultDatastore(function(error, datastore) {

			    Settings.dropbox.datastore = datastore;
			    Settings.dropbox.datastore.stacks = Settings.dropbox.datastore.getTable("Stacks");
			    Settings.dropbox.datastore.flashcards = Settings.dropbox.datastore.getTable("Flashcards");
			    Settings.dropbox.datastore.statistics = Settings.dropbox.datastore.getTable("Statistics");

				Settings.dropbox.datastore.recordsChanged.addListener(Settings.syncDropbox);
			});
		}
	};

	Settings.syncDropbox = function(e) {

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
		window.indexedDB.deleteDatabase("Stacks");
		window.indexedDB.deleteDatabase("Statistics");
		window.localStorage.clear();
		window.location.reload();
	};

	/* ============================== */
	/* ====== RESET STATISTICS ====== */
	/* ============================== */

	Settings.reset_statistics = function() {
		window.indexedDB.deleteDatabase("Statistics");
		window.location.reload();
	};

	return Settings;
})