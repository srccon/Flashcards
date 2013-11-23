define(function() {

	var Database = {};

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Database.initialize = function(callback) {

		App = require("app");

		var w = window, requestStacks, requestStatistics;

		w.indexedDB = w.indexedDB || w.mozIndexedDB || w.webkitIndexedDB || w.msIndexedDB;
		w.IDBTransaction = w.IDBTransaction || w.webkitIDBTransaction || w.msIDBTransaction;
		w.IDBKeyRange = w.IDBKeyRange || w.webkitIDBKeyRange || w.msIDBKeyRange;

		requestStacks = w.indexedDB.open("Stacks");

		requestStacks.onsuccess = function(e) {

			Database.Stacks = requestStacks.result;
			requestStatistics = w.indexedDB.open("Statistics");

			requestStatistics.onsuccess = function(e) {
				Database.Statistics = requestStatistics.result;
				callback();
			};
		};
	};

	/* ================================= */
	/* ====== CREATE OBJECT STORE ====== */
	/* ================================= */

	Database.createObjectStore = function(dbName, name, onupgradeneeded, onsuccess) {

		if (Database.createObjectStore.pending) {
			if (!Database.createObjectStore.pendingTasks)
			{ Database.createObjectStore.pendingTasks = []; }

			Database.createObjectStore.pendingTasks.push([dbName, name, onupgradeneeded, onsuccess]);
			return;
		}

		Database.createObjectStore.pending = true;

		var exists = false,
		    version,
		    request,
		    objectStore;

		[].forEach.call(Database[dbName].objectStoreNames, function(v) {
			if (v == name) { exists = true; return false; }
		});

		if (exists) { return; }

		version = Database[dbName].version + 1;
		Database[dbName].close();
		request = window.indexedDB.open(dbName, version);

		request.onsuccess = function(e) {
			Database.createObjectStore.pending = false;
			Database[dbName] = request.result;
			if (onsuccess) { onsuccess(); }

			if (Database.createObjectStore.pendingTasks) {
				var task = Database.createObjectStore.pendingTasks.shift();
				if (task) { Database.createObjectStore.apply(this, task); }
			}
		};

		request.onupgradeneeded = function(e) {
			var db = e.target.result;
			objectStore = db.createObjectStore(name, { autoIncrement: true });
			if (onupgradeneeded) { onupgradeneeded(objectStore); }
		};
	};

	/* ================================= */
	/* ====== DELETE OBJECT STORE ====== */
	/* ================================= */

	Database.deleteObjectStore = function(dbName, name, onupgradeneeded, onsuccess) {

		if (Database.deleteObjectStore.pending) {
			if (!Database.deleteObjectStore.pendingTasks)
			{ Database.deleteObjectStore.pendingTasks = []; }

			Database.deleteObjectStore.pendingTasks.push([dbName, name, onupgradeneeded, onsuccess]);
			return;
		}

		Database.deleteObjectStore.pending = true;

		var version,
		    request,
		    objectStore;

		version = Database[dbName].version + 1;
		Database[dbName].close();
		request = window.indexedDB.open(dbName, version);

		request.onsuccess = function(e) {
			Database.deleteObjectStore.pending = false;
			Database[dbName] = request.result;
			if (onsuccess) { onsuccess(); }

			if (Database.deleteObjectStore.pendingTasks) {
				var task = Database.deleteObjectStore.pendingTasks.shift();
				if (task) { Database.deleteObjectStore.apply(this, task); }
			}
		};

		request.onupgradeneeded = function(e) {
			var db = e.target.result;
			objectStore = db.deleteObjectStore(name);
			if (onupgradeneeded) { onupgradeneeded(objectStore); }
		};
	};

	/* ====================== */
	/* ====== GET DATA ====== */
	/* ====================== */

	Database.getData = function(dbName, objectStoreName, key, onsuccess) {
		
		var transaction = Database[dbName].transaction(objectStoreName);
		var objectStore = transaction.objectStore(objectStoreName);
		var pairs = [];

		if (key !== null) {

			objectStore.get(+key).onsuccess = function(e) { onsuccess(e.target.result); };

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

	/* ====================== */
	/* ====== ADD DATE ====== */
	/* ====================== */

	Database.addData = function(dbName, objectStoreName, data, onsuccess) {
		var transaction = Database[dbName].transaction(objectStoreName, "readwrite");
		var objectStore = transaction.objectStore(objectStoreName);

		if (data.length) {
			data.forEach(function(v) { objectStore.add(v); });
		} else {
			objectStore.add(data).onsuccess = onsuccess;
		}
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

		Database.createObjectStore("Stacks", "Japanese - Greetings", null, function() {
			Database.addData("Stacks", "Japanese - Greetings", [
			{
				front: "Nice to meet you!",
				back: "はじめまして！"
			}, {
				front: "Good morning!",
				back: "おはよう！"
			}, {
				front: "Good evening!",
				back: "こんにちは"
			}, {
				front: "Good night.",
				back: "こんばんは。"
			}
			]);
		});

		Database.createObjectStore("Stacks", "Japanese - Animals", null, function() {
			Database.addData("Stacks", "Japanese - Animals", [
			{
				front: "Dog",
				back: "犬「いぬ」"
			}, {
				front: "Cat",
				back: "猫「ねこ」"
			}, {
				front: "Horse",
				back: "馬「うま」"
			}, {
				front: "Fish",
				back: "魚「さかな」"
			}, {
				front: "Bird",
				back: "鳥「とり」"
			}
			]);

			App.Stacks.updateView();
		});

		Database.createObjectStore("Statistics", "Japanese - Greetings");
		Database.createObjectStore("Statistics", "Japanese - Animals");
	};

	return Database;
})