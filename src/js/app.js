define([

	"jquery",

	"modules/utils",
	"modules/router",

	"modules/settings",
	"modules/database",

	"modules/statistics",
	"modules/stacks",
	"modules/flashcards",
	"fastclick"

], function($, Utils, Router, Settings, DB, Statistics, Stacks, Flashcards, fastclick) {

	var App = {
		_settings: Utils.localStorage("settings") || {},
		isMobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
	};

	App._settings.translation_preferences = App._settings.translation_preferences || {};
	App.isCordova = App.isMobile && (document.location.protocol == "file:");

	App.$ = $;
	App.Utils = Utils;
	App.Router = Router;
	App.Settings = Settings;
	App.DB = DB;
	App.Statistics = Statistics;
	App.Stacks = Stacks;
	App.Flashcards = Flashcards;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	App.initialize = function() {

		// Load indexedDB shim if needed
		if (!window.indexedDB || (window.indexedDB && window.indexedDB.setVersion)) {

			require(["js_external/indexedDB.js"], function() {
				// window.shimIndexedDB.__debug(true);
				App.initialize();
			});

			return;
		}

		// Open external links with Cordova's InAppBrowser
		if (App.isCordova) {

			$("body").on("click", "a[target='_blank']", function(e) {

				var url = $(e.currentTarget).attr("href");
				window.open(url, "_blank", "location=yes");

				e.preventDefault();
				return false;
			});

		// Load roboto font
		} else {
			App.$("head").append("<link rel='stylesheet' type='text/css' href='css_external/roboto.css'>");
		}

		// Other modules depend on Utils
		// so initialize them first
		Utils.initialize();

		// Initialize the database
        DB.initialize(function() {
            DB.createTestData(function() {
                Settings.initialize();
                Statistics.initialize();
                Stacks.initialize();
                Flashcards.initialize();
                Router.initialize();
                App.registerEvents();
            });
        });
    };

	/* ======================= */
	/* ====== IS ONLINE ====== */
	/* ======================= */

	App.isOnline = function() {
		return App.isOnlineCordova !== undefined ? App.isOnlineCordova : navigator.onLine;
	};

	/* ============================= */
	/* ====== REGISTER EVENTS ====== */
	/* ============================= */

	App.registerEvents = function() {

		// Translates click events into touch events
		fastclick.attach(document.body);

		// Menubutton event listener
		document.addEventListener("menubutton", function(e) {

			if (!Router.$page) { return; }
			var $actions = Router.$page.find(".actions");
			$actions.toggleClass("android-menu");
			Utils.forceRender($("body"));

		}, false);

		// Register module events
		var key, evt, pair, type, selector;

		for (key in App) {
			if (App[key].events) {
				for (evt in App[key].events) {
					pair = evt.split(" ");
					type = pair.shift().replace("|", " ");
					selector = pair.join(" ");
					$("body").on(type, selector, App[key].events[evt]);
				}
			}
		}
	};

	return App;

});
