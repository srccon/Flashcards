require.config({

	shim: {
		"chart": { exports: "Chart" },
		"transit": { deps: ["jquery"] }
	},

	paths: {
		"IDBOpen": "shims/IDBOpen",
		"jquery": "libs/jquery",
		"chart": "libs/chart",
		"transit": "plugins/jquery.transit",
		"fastclick": "libs/fastclick"
	}
});

require(["app"], function(App) {

	if (App.isCordova) {

		require(["js_external/utils.cordova"], function(Cordova_Utils) {
			App.Utils.Cordova = Cordova_Utils;
			App.Utils.Cordova.initialize();
		});

		return;
	}

	App.initialize();
});