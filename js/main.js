require.config({

	shim: {
		"chart": { exports: "Chart" },
		"dropbox": { exports: "Dropbox" },
		"transit": { deps: ["jquery"] }
	},

	paths: {
		"jquery": "libs/jquery",
		"dropbox": "libs/dropbox",
		"chart": "libs/chart",
		"transit": "plugins/jquery.transit",
		"fastclick": "libs/fastclick"
	}

});

require(["app"], function(App) {

	if (App.isPhoneGap) {
		require(["libs/cordova"], function() {
			document.addEventListener("deviceready", App.initialize);
		});

		return;
	}

	App.initialize();
});