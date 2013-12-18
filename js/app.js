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

	App.isPhoneGap = App.isMobile && (document.location.protocol == "file:");

	App.$ = $;
	App.Utils = Utils;
	App.Router = Router;
	App.Settings = Settings;
	App.DB = DB;
	App.Statistics = Statistics;
	App.Stacks = Stacks;
	App.Flashcards = Flashcards;

	App.initialize = function() {

		// Load indexedDB shim if needed
		if (!window.indexedDB) {

			require(["shims/indexedDB"], function() {
				// window.shimIndexedDB.__debug(true);
				App.initialize();
			});

			return;
		}

		// Open external links with PhoneGap's InAppBrowser
		if (App.isPhoneGap) {
			$("body").on("click", "a[target='_blank']", function(e) {

				var url = $(e.currentTarget).attr("href");
				window.open(url, "_blank", "location=yes");

				e.preventDefault();
				return false;
			});
		}

		// Translates click events into touch events
		fastclick.attach(document.body);

		// Menubutton event listener
		document.addEventListener("menubutton", function(e) {

			var $actions = App.Router.$page.find(".actions");
			$actions.toggleClass("android-menu");
			App.Utils.forceRender($("body"));

		}, false);

		Utils.initialize();

		// Initialize the database
		DB.initialize(function() {

			Settings.initialize();
			Statistics.initialize();

			Stacks.initialize();
			Flashcards.initialize();

			App.registerEvents();
			
			Router.initialize();

			// Insert some test data on first runtime
			if (!Utils.localStorage("testdata")) {
				DB.createTestData();
				Utils.localStorage("testdata", true);
			}
		});
	};

	App.registerEvents = function() {
		
		var key, event, pair, type, selector;

		for (key in App) {
			if (App[key].events) {
				for (event in App[key].events) {
					pair = event.split(" ");
					type = pair.shift().replace("|", " ");
					selector = pair.join(" ");
					$("body").on(type, selector, App[key].events[event])
				}
			}
		}
	};

	return App;

});