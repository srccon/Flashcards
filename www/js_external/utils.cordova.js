define(function() {

	var Cordova_Utils = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Cordova_Utils.initialize = function() {

		App = require("app");

		App.$("body").on("click", "#file-browser li", function(e) {

			var $entry = App.$(e.currentTarget);
			var entry = App.$(e.currentTarget).text().trim();
			var directory = $entry.attr("data-directory");

			if (directory) {

				Cordova_Utils.changeDir(directory);
				Cordova_Utils.updateView();

			} else { Cordova_Utils.readFile(entry, App.Settings.import_json); }
		});

		document.addEventListener("deviceready", function() {
			Cordova_Utils.currentDir = cordova.file.externalRootDirectory;
			Cordova_Utils.registerEvents();
			Cordova_Utils.getFilesystem(App.initialize);
		});
	};

	/* ============================= */
	/* ====== REGISTER EVENTS ====== */
	/* ============================= */

	Cordova_Utils.registerEvents = function() {
		document.addEventListener("online", function() {
			App.isOnlineCordova_Utils = true;
		}, false);

		document.addEventListener("offline", function() {
			App.isOnlineCordova_Utils = false;
		}, false);
	};

	/* ========================== */
	/* ====== UPDATE VIEW ======= */
	/* ========================== */

	Cordova_Utils.updateView = function(entries, callback) {

		var fn_populate = function(entries) {

			App.$("#page-file-browser .path").html(Cordova_Utils.currentDir);

			if (Cordova_Utils.currentDir != "/") {
				$fileBrowser.append("<li data-directory='..'><span class='fa fa-arrow-left' style='margin-right: 0.5em'></span> <em>parent directory</em></li>");
			}

			entries.forEach(function(v) {
				if (v.isDirectory)
				$fileBrowser.append("<li data-directory='" + v.name + "'><span class='fa fa-folder'></span> " + v.name + "<span class='fa fa-arrow-right' style='float: right;'></span></li>");
				else
				$fileBrowser.append("<li><span class='fa fa-file' style='margin-right: 0.5em'></span> " + v.name + "</li>");
			});

			if (callback) { callback(); }
		};

		var $fileBrowser = App.$("#file-browser");
		$fileBrowser.html("");

		if (entries)
		{ fn_populate(entries); }
		else
		{ Cordova_Utils.readDir(fn_populate); }
	};

	/* ============================= */
	/* ====== GET FILESYSTEM ======= */
	/* ============================= */

	Cordova_Utils.getFilesystem = function(callback) {

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 5*1024*1024, function(filesystem) {

			Cordova_Utils.filesystem = filesystem;
			callback(filesystem);

		}, Cordova_Utils.errorHandler);
	};

	/* ========================= */
	/* ====== WRITE FILE ======= */
	/* ========================= */

	Cordova_Utils.writeFile = function(path, content, callback) {

		// Callback hell!

		window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(directoryEntry) {

			// Create our directory if it doesn't exist (I know this could be optimized)
			directoryEntry.getDirectory("Documents", { create: true, exclusive: false }, function(directoryEntry) {

				// Create our directory if it doesn't exist
				directoryEntry.getDirectory("Flashcards", { create: true, exclusive: false }, function(directoryEntry) {

					directoryEntry.getFile(path, { create: true, exclusive: false }, function(fileEntry) {

						// Write file
						fileEntry.createWriter(function(writer) {

							writer.onwrite = callback;
							writer.write(content);

						}, Cordova_Utils.errorHandler);

					}, Cordova_Utils.errorHandler);

				}, Cordova_Utils.errorHandler);

			}, Cordova_Utils.errorHandler);

		}, Cordova_Utils.errorHandler);
	};

	/* ========================= */
	/* ====== CHANGE DIR ======= */
	/* ========================= */

	Cordova_Utils.changeDir = function(directory) {

		if (directory == "..") {
			Cordova_Utils.currentDir = Cordova_Utils.currentDir.replace(/\/?[^\/]+\/?$/, "/");
			return;
		}
		
		var path = Cordova_Utils.currentDir.split("/"); path.push(directory, "/");
		Cordova_Utils.currentDir = path.join("/").replace(/\/+/g, "/");
	};

	/* ======================= */
	/* ====== READ DIR ======= */
	/* ======================= */

	Cordova_Utils.readDir = function(callback) {

		// Lookup directory
		window.resolveLocalFileSystemURL(Cordova_Utils.currentDir, function(directoryEntry) {

			// Read directory
			directoryEntry.createReader().readEntries(function(entries) {
				
				entries = entries.sort(function(a, b) {
					return a.isDirectory > b.isDirectory ? -1 : 1;
				});

				callback(entries);

			}, Cordova_Utils.errorHandler);

		}, Cordova_Utils.errorHandler);
	};

	/* ======================== */
	/* ====== READ FILE ======= */
	/* ======================== */

	Cordova_Utils.readFile = function(file, callback) {

		// Get/create file
		window.resolveLocalFileSystemURL(Cordova_Utils.currentDir, function(directoryEntry) {

			directoryEntry.getFile(file, { create: false, exclusive: false }, function(fileEntry) {

				fileEntry.file(function(file) {

					var reader = new FileReader();
					reader.onloadend = function(e) { callback(e.target.result) };
					reader.readAsText(file);

				}, Cordova_Utils.errorHandler);

			}, Cordova_Utils.errorHandler);

		}, Cordova_Utils.errorHandler);
	};

	Cordova_Utils.errorHandler = function(e) {

		var msg = "";

		switch (e.code) {
			case FileError.QUOTA_EXCEEDED_ERR:       msg = "QUOTA_EXCEEDED_ERR";       break;
			case FileError.NOT_FOUND_ERR:            msg = "NOT_FOUND_ERR";            break;
			case FileError.SECURITY_ERR:             msg = "SECURITY_ERR";             break;
			case FileError.INVALID_MODIFICATION_ERR: msg = "INVALID_MODIFICATION_ERR"; break;
			case FileError.INVALID_STATE_ERR:        msg = "INVALID_STATE_ERR";        break;
			default:                                 msg = "Unknown Error";            break;
		};

		console.log("Error: " + msg + " (" + e.code + ")");
	};

	return Cordova_Utils;
});