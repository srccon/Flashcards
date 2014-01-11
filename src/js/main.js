require.config({

	shim: {
		"chart": { exports: "Chart" },
		"transit": { deps: ["jquery"] }
	},

	paths: {
		"jquery": "libs/jquery",
		"chart": "libs/chart",
		"transit": "plugins/jquery.transit",
		"fastclick": "libs/fastclick"
	}
});

require(["app"], function(App) {

	if (App.isPhoneGap) {
		require(["cordova.js", "js_external/utils_phonegap"], function(Cordova, PhoneGap_Utils) {
			App.Utils.PhoneGap = PhoneGap_Utils;
			App.Utils.PhoneGap.initialize();
		});

		return;
	}

	App.initialize();
});