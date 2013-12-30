define(function() {

	var PhoneGap = {}, App;
	PhoneGap.currentDir = "/mnt/sdcard/";

	PhoneGap.initialize = function() {

		App = require("app");
		
		$("body").on("click", "#file-browser li", function(e) {

			var $entry = $(e.currentTarget);
			var entry = $(e.currentTarget).text().trim();
			var directory = $entry.attr("data-directory");

			if (directory) {

				PhoneGap.changeDir(directory);
				PhoneGap.updateView();

			} else { PhoneGap.readFile(entry, App.Settings.import_json); }
		});
	};

	PhoneGap.updateView = function(entries, callback) {

		var fn_populate = function(entries) {

			$("#page-file-browser .path").html(PhoneGap.currentDir);

			if (PhoneGap.currentDir != "/") {
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
		{ PhoneGap.readDir(fn_populate); }
	};

	/* ============================= */
	/* ====== GET FILESYSTEM  ====== */
	/* ============================= */

	PhoneGap.getFilesystem = function(callback) {

		if (PhoneGap.filesystem) { return callback(PhoneGap.filesystem); }

		window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(filesystem) {
			PhoneGap.filesystem = filesystem;
			callback(filesystem);
		});
	};

	/* ========================= */
	/* ====== WRITE FILE  ====== */
	/* ========================= */

	PhoneGap.writeFile = function(path, content, callback) {

		// Create our directory if it doesn't exist
		PhoneGap.filesystem.root.getDirectory("flashcards", { create: true, exclusive: false }, function(directoryEntry) {

			// Get/create file
			PhoneGap.filesystem.root.getFile(path, { create: true, exclusive: false }, function(fileEntry) {

				// Write file
				fileEntry.createWriter(function(writer) {
					writer.onwrite = callback;
					writer.write(content);
				});
			});
		});
	};

	/* ========================= */
	/* ====== CHANGE DIR  ====== */
	/* ========================= */

	PhoneGap.changeDir = function(directory) {

		if (directory == "..") {
			PhoneGap.currentDir = PhoneGap.currentDir.replace(/\/?[^\/]+\/?$/, "/");
			return;
		}
		
		var path = PhoneGap.currentDir.split("/"); path.push(directory, "/");
		PhoneGap.currentDir = path.join("/").replace(/\/+/g, "/");
	};

	/* ======================= */
	/* ====== READ DIR  ====== */
	/* ======================= */

	PhoneGap.readDir = function(callback) {

		// Lookup directory
		PhoneGap.filesystem.root.getDirectory(PhoneGap.currentDir, { create: false, exclusive: false }, function(directoryEntry) {

			// Read directory
			directoryEntry.createReader().readEntries(function(entries) {
				
				entries = entries.sort(function(a, b) {
					return a.isDirectory > b.isDirectory ? -1 : 1;
				});

				callback(entries);
			});
		});
	};

	/* ======================== */
	/* ====== READ FILE  ====== */
	/* ======================== */

	PhoneGap.readFile = function(file, callback) {

		// Get/create file
		PhoneGap.filesystem.root.getFile(PhoneGap.currentDir + file, { create: false, exclusive: false }, function(fileEntry) {

			fileEntry.file(function(file) {

				var reader = new FileReader();
				reader.onloadend = function(e) { callback(e.target.result) };
				reader.readAsText(file);
			});
		});
	};

	return PhoneGap;
});