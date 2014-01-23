define(["IDBOpen"], function(IDBOpen) {

	// Documentation: https://developer.mozilla.org/en-US/docs/IndexedDB

	var Database = {}, w = window, App;

	w.indexedDB = w.indexedDB || w.mozIndexedDB || w.webkitIndexedDB || w.msIndexedDB;
	w.IDBTransaction = w.IDBTransaction || w.webkitIDBTransaction || w.msIDBTransaction;
	w.IDBKeyRange = w.IDBKeyRange || w.webkitIDBKeyRange || w.msIDBKeyRange;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Database.initialize = function(callback) {

		App = require("app");
		var request;

		// Open database
		request = IDBOpen("App");
		request.onerror = function() { App.Utils.dialog("Error", "Can't open the database!"); };

		request.onsuccess = function(e) {

			// Store database object
			Database.App = request.result;

			// Create necessary object stores
			Database.createObjectStore("App", "Stacks");
			Database.createObjectStore("App", "Flashcards", function(objectStore) { objectStore.createIndex("stackID", "stackID", { unique: false }); });
			Database.createObjectStore("App", "Statistics", function(objectStore) { objectStore.createIndex("stackID", "stackID", { unique: false }); }, callback, callback);
		};
	};



	/* ================================= */
	/* ====== CREATE OBJECT STORE ====== */
	/* ================================= */

	Database.createObjectStore = function(dbName, name, onupgradeneeded, onsuccess, onexists) {

		// objectStore already exists
		if ([].indexOf.call(Database[dbName].objectStoreNames, name) != -1) { return (onexists || function(){})(); }

		// Operation pending, store current call in queue
		if (Database.createObjectStore.pending) {

			if (!Database.createObjectStore.queue)
			{ Database.createObjectStore.queue = []; }

			Database.createObjectStore.queue.push(arguments);
			return;
		}

		Database.createObjectStore.pending = true;
		var version, request, objectStore;

		// Reopen DB with new version
		version = Database[dbName].version + 1; Database[dbName].close();
		request = IDBOpen(dbName, version);

		// Create new objectStore
		request.onupgradeneeded = function(e) {
			objectStore = request.result.createObjectStore(name, { autoIncrement: true });
			if (onupgradeneeded) { onupgradeneeded(objectStore); }
		};

		request.onsuccess = function(e) {
			Database.createObjectStore.pending = false;
			Database[dbName] = request.result;

			if (onsuccess) { onsuccess(); }

			// Process next call if available
			if (Database.createObjectStore.queue) {
				var call = Database.createObjectStore.queue.shift();
				if (call) { Database.createObjectStore.apply(this, call); }
			}
		};
	};

	/* ================================= */
	/* ====== DELETE OBJECT STORE ====== */
	/* ================================= */

	Database.deleteObjectStore = function(dbName, name, onupgradeneeded, onsuccess) {

		// Operation pending, store current call in queue
		if (Database.deleteObjectStore.pending) {

			if (!Database.deleteObjectStore.queue)
			{ Database.deleteObjectStore.queue = []; }

			Database.deleteObjectStore.queue.push([dbName, name, onupgradeneeded, onsuccess]);
			return;
		}

		Database.deleteObjectStore.pending = true;
		var version, request, objectStore;

		// Reopen DB with new version
		version = Database[dbName].version + 1; Database[dbName].close();
		request = IDBOpen(dbName, version);

		// Delete objectStore
		request.onupgradeneeded = function(e) {
			objectStore = request.result.deleteObjectStore(name);
			if (onupgradeneeded) { onupgradeneeded(objectStore); }
		};

		request.onsuccess = function(e) {
			Database.deleteObjectStore.pending = false;
			Database[dbName] = request.result;
			if (onsuccess) { onsuccess(); }

			if (Database.deleteObjectStore.queue) {
				var call = Database.deleteObjectStore.queue.shift();
				if (call) { Database.deleteObjectStore.apply(this, call); }
			}
		};
	};

	/* ====================== */
	/* ====== GET DATA ====== */
	/* ====================== */

	Database.getData = function(dbName, objectStoreName, key, onsuccess) {

		var transaction = Database[dbName].transaction(objectStoreName);
		var objectStore = transaction.objectStore(objectStoreName);
		var pairs = [], range;
		var filter = key && typeof key == "object" && key.length;

		if (typeof key == "number") {

			objectStore.get(key).onsuccess = function(e) { onsuccess(e.target.result); };

		} else if (key && typeof key == "object" && key.length === undefined) {

			range = window.IDBKeyRange.only(key.range);

			objectStore.index(key.index).openCursor(range).onsuccess = function(e) {

				var cursor = e.target.result;

				if (cursor) {
					
					pairs.push({
						value: cursor.value,
						key: cursor.primaryKey
					});

					cursor["continue"]();

				} else { onsuccess(pairs); }
			};

		} else {

			objectStore.openCursor().onsuccess = function(e) {

				var cursor = e.target.result;

				if (cursor) {

					if (filter && key.indexOf(cursor.key) == -1) {
						cursor["continue"]();
						return;
					}

					pairs.push({
						value: cursor.value,
						key: cursor.key
					});

					cursor["continue"]();

				} else { onsuccess(pairs); }
			};
		}
	};

	/* ======================================== */
	/* ====== COUNT OBJECT STORE ENTRIES ====== */
	/* ======================================== */

	Database.countObjectStoreEntries = function(dbName, objectStoreName, key, callback) {

		var transaction = Database[dbName].transaction(objectStoreName);
		var objectStore = transaction.objectStore(objectStoreName);
		var pairs = [], range, request;

		if (key && typeof key == "object" && key.length) {

			range = window.IDBKeyRange.only(key[1]);
			request = objectStore.index(key[0]).count(range);

		} else { request = objectStore.count(); }

		request.onsuccess = function(e) { callback(e.target.result); };
	};

	/* ====================== */
	/* ====== ADD DATE ====== */
	/* ====================== */

	Database.addData = function(dbName, objectStoreName, data, onsuccess) {

		var transaction = Database[dbName].transaction(objectStoreName, "readwrite");
		var objectStore = transaction.objectStore(objectStoreName);

		if (data.length) {
			data.forEach(function(v, i) {
				if (i == data.length-1)
				{ objectStore.add(v).onsuccess = onsuccess; }
				else
				{ objectStore.add(v); }
			});
		} else { objectStore.add(data).onsuccess = onsuccess; }
	};

	/* ========================= */
	/* ====== UPDATE DATA ====== */
	/* ========================= */

	Database.updateData = function(dbName, objectStoreName, key, newData, onsuccess) {

		var transaction = Database[dbName].transaction(objectStoreName, "readwrite");
		var objectStore = transaction.objectStore(objectStoreName), request, range, fn;

		if (typeof key == "object" && key.length === undefined) {

			range = key.range ? window.IDBKeyRange.only(key.range) : undefined;

			fn = function(e) {

				var cursor = e.target.result, attr, data = newData;

				if (cursor) {

					if (newData.length) { data = newData[cursor.key] || {}; }

					if (key.keys.indexOf(cursor.primaryKey) != -1) {
						for (attr in data) { cursor.value[attr] = data[attr]; }
						cursor.update(cursor.value);
					}

					cursor["continue"]();

				} else { onsuccess(); }
			};

			if (range) { objectStore.index(key.index).openCursor(range).onsuccess = fn; }
			else {objectStore.index(key.index).openCursor().onsuccess = fn; }

		} else {

			request = objectStore.get(+key).onsuccess = function(e) {

				var data = e.target.result, attr;
				for (attr in newData) { data[attr] = newData[attr]; }

				objectStore.put(data, +key).onsuccess = onsuccess;
			};
		}
	};

	/* ========================= */
	/* ====== REMOVE DATA ====== */
	/* ========================= */

	Database.removeData = function(dbName, objectStoreName, key, onsuccess) {

		var transaction = Database[dbName].transaction(objectStoreName, "readwrite");
		var objectStore = transaction.objectStore(objectStoreName);
		var request, range, fn;

		if (typeof key == "object" && key.length === undefined) {

			range = key.range ? window.IDBKeyRange.only(key.range) : undefined;

			fn = function(e) {

				var cursor = e.target.result;

				if (cursor) {

					if (key.keys.indexOf(cursor.primaryKey) != -1)
					{ objectStore.delete(cursor.primaryKey); }

					cursor["continue"]();

				} else { onsuccess(); }
			};

			if (range) { objectStore.index(key.index).openKeyCursor(range).onsuccess = fn; }
			else { objectStore.index(key.index).openKeyCursor().onsuccess = fn; }


		} else {
			request = objectStore["delete"](key);
			request.onsuccess = onsuccess;
		}
	};

	/* =============================== */
	/* ====== CREATE TEST DATA  ====== */
	/* =============================== */

	Database.createTestData = function(callback) {

		if (App.Utils.localStorage("testdata") && callback)
		{ return callback(); }

		App.Utils.localStorage("testdata", true);

		var count = 0, fn_finish = function() {
			if (++count > 1 && callback) { callback(); }
		};

		App.Stacks.create("Japanese", "Greetings", function(stackID) {
			App.Flashcards.add([
				{
					stackID: stackID,
					front: "Nice to meet you!",
					back: "はじめまして！"
				}, {
					stackID: stackID,
					front: "Good morning!",
					back: "おはよう！"
				}, {
					stackID: stackID,
					front: "Good afternoon!",
					back: "こんにちは！"
				}, {
					stackID: stackID,
					front: "Good evening.",
					back: "こんばんは。"
				}
			], fn_finish);
		}, true);

		App.Stacks.create("Japanese", "Animals", function(stackID) {
				App.Flashcards.add([
				{
					stackID: stackID,
					front: "Dog",
					back: "犬{いぬ}"
				},
				{
					stackID: stackID,
					front: "Cat",
					back: "猫{ねこ}"
				},
				{
					stackID: stackID,
					front: "Horse",
					back: "馬{うま}"
				},
				{
					stackID: stackID,
					front: "Fish",
					back: "魚{さかな}"
				},
				{
					stackID: stackID,
					front: "Bird",
					back: "鳥{とり}"
				}
			], fn_finish);
		}, true);	
	};

	return Database;
});