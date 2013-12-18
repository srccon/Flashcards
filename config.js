({
	baseUrl: "js",
	name: "main",
	out: "js/build.js",
	include: ["libs/require.js"],

	paths: {
		"jquery": "libs/jquery",
		"chart": "libs/chart",
		"transit": "plugins/jquery.transit",
		"fastclick": "libs/fastclick"
	}
})