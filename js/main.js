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

	App.initialize();

});