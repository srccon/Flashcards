define(function() {

	var Utils = {}, App;
	
	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Utils.initialize = function() {

		App = require("app");
	};

	/* ========================== */
	/* ====== LOCALSTORAGE ====== */
	/* ========================== */

	Utils.localStorage = function(key, value) {
		if (key !== undefined && value !== undefined) {
			// Phonegap hack ?
			window.localStorage.removeItem(key);
			window.localStorage.setItem(key, JSON.stringify(value));
		} else if (key !== undefined) {
			return JSON.parse(window.localStorage.getItem(key));
		}
	};	

	/* ======================== */
	/* ====== FAKE CLICK ====== */
	/* ======================== */

	Utils.fake_click = function (anchor) {

		if (anchor.click) {
			anchor.click();
		} else if (document.createEvent) {
			if (event.target !== anchor) {
				var evt = document.createEvent("MouseEvents"); 
				evt.initMouseEvent("click", true, true, window, 
				0, 0, 0, 0, 0, false, false, false, false, 0, null); 
				var allowDefault = anchor.dispatchEvent(evt);
			}
		}
	};

	/* ================================== */
	/* ====== PHONEGAP WRITE FILE  ====== */
	/* ================================== */

	Utils.PhonegapWriteFile = function(path, content, callback) {

		if (!Utils.PhonegapWriteFile.filesystem) {

			var _this = this;
			var args = arguments;

			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(filesystem) {
				Utils.PhonegapWriteFile.filesystem = filesystem;
				Utils.PhonegapWriteFile.apply(_this, args);
			});

			return;
		}

		Utils.PhonegapWriteFile.filesystem.root.getDirectory("flashcards", { create: true, exclusive: false }, function(directoryEntry) {
			Utils.PhonegapWriteFile.filesystem.root.getFile(path, { create: true, exclusive: false }, function(fileEntry) {
				fileEntry.createWriter(function(writer) {
					writer.onwrite = callback;
					writer.write(content);
				});
			});
		});
	};

	/* =========================== */
	/* ====== ARRAY SHUFFLE ====== */
	/* =========================== */

	Utils.array_shuffle = function(arr) {
		var count = arr.length, temp, index;

		while (count--) {
			index = (Math.random() * count) | 0;
			temp = arr[count];
			arr[count] = arr[index];
			arr[index] = temp;
		}

		return arr;
	};

	return Utils;
});