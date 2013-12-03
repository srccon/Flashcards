define(function() {

	var Database = {};

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Database.initialize = function(callback) {

		App = require("app");
		var w = window, request;

		w.indexedDB = w.indexedDB || w.mozIndexedDB || w.webkitIndexedDB || w.msIndexedDB;
		w.IDBTransaction = w.IDBTransaction || w.webkitIDBTransaction || w.msIDBTransaction;
		w.IDBKeyRange = w.IDBKeyRange || w.webkitIDBKeyRange || w.msIDBKeyRange;

		// Open database
		request = w.indexedDB.open("App");
		request.onsuccess = function(e) {

			// Store database object
			Database.App = request.result;

			// Create necessary objectsores
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
		request = window.indexedDB.open(dbName, version);

		// Create new objectStore
		request.onupgradeneeded = function(e) {
			var db = e.target.result;
			objectStore = db.createObjectStore(name, { autoIncrement: true });
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
		request = window.indexedDB.open(dbName, version);

		// Delete objectStore
		request.onupgradeneeded = function(e) {
			var db = e.target.result;
			objectStore = db.deleteObjectStore(name);

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

		if (typeof key == "number") {

			objectStore.get(key).onsuccess = function(e) { onsuccess(e.target.result); };

		} else if (key && typeof key == "object" && key.length) {

			range = window.IDBKeyRange.only(key[1]);

			objectStore.index(key[0]).openCursor(range).onsuccess = function(e) {

				var cursor = e.target.result;

				if (cursor) {

					pairs.push({
						value: cursor.value,
						key: cursor.primaryKey
					});

					cursor.continue();

				} else { onsuccess(pairs); }
			};

		} else {

			objectStore.openCursor().onsuccess = function(e) {

				var cursor = e.target.result;

				if (cursor) {

					pairs.push({
						value: cursor.value,
						key: cursor.key
					});

					cursor.continue();

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
		var objectStore = transaction.objectStore(objectStoreName);

		var request = objectStore.get(+key).onsuccess = function(e) {

			var data = e.target.result, attr;
			for (attr in newData) { data[attr] = newData[attr]; }

			objectStore.put(data, +key).onsuccess = onsuccess;
		};
	};

	/* ========================= */
	/* ====== REMOVE DATA ====== */
	/* ========================= */

	Database.removeData = function(dbName, objectStoreName, key, onsuccess) {

		var transaction = Database[dbName].transaction(objectStoreName, "readwrite");
		var objectStore = transaction.objectStore(objectStoreName);
		var request = objectStore.delete(key);

		request.onsuccess = onsuccess;
	};

	/* =============================== */
	/* ====== CREATE TEST DATA  ====== */
	/* =============================== */

	Database.createTestData = function() {

		App.Stacks.create("Japanese - Greetings", function(id) {
			App.Flashcards.add([
				{
					stackID: id,
					front: "Nice to meet you!",
					back: "はじめまして！"
				}, {
					stackID: id,
					front: "Good morning!",
					back: "おはよう！"
				}, {
					stackID: id,
					front: "Good evening!",
					back: "こんにちは！"
				}, {
					stackID: id,
					front: "Good night.",
					back: "こんばんは。"
				}
			]);
		});
	};

	return Database;
});