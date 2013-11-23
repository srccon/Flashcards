define(["chart"], function(Chart) {

	var Statistics = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */
	
	Statistics.initialize = function() {

		App = require("app");

		var updateTimeout;

		$(window).on("resize", function() {

			window.clearTimeout(updateTimeout);

			updateTimeout = window.setTimeout(function() {

				Statistics.updateView()
			}, 100);
		});
	};

	Statistics.updateView = function() {

		var count = 0;

		[].forEach.call(App.DB.Statistics.objectStoreNames, function(v) {

			App.DB.getData("Statistics", v, null, function(data) {

				if (data.length < 2) { return; }

				if (!count) { App.$("#page-statistics").find("[data-role=content]").html(""); }
				count++;

				var ctx = document.createElement("canvas").getContext("2d");

				ctx.canvas.width = $("body").width() - 100;
				ctx.canvas.height = Math.round(ctx.canvas.width / 1.618);

				App.$("#page-statistics").find("[data-role=content]").append("<h1>" + v + "</h1><hr>");
				App.$("#page-statistics").find("[data-role=content]").append(ctx.canvas);
				App.$("#page-statistics").find("[data-role=content]").append("<hr class='transparent'>");

				var labels = [], datasets = [{
					fillColor: "#777",
					strokeColor: "#333",
					data: [],
					label: "foo"
				}];

				var max_scale = 0;

				data.forEach(function(v) {

					var date = new Date(v.value.timestamp);
					labels.push("".split.call(date, " ").slice(0, 3).join(" "));
					datasets[0].data.push(v.value.score);

					max_scale = v.value.total > max_scale ? v.value.total : max_scale;
				});

				var chart = new Chart(ctx).Line({ labels: labels, datasets: datasets }, {
					scaleOverride: true,
					scaleSteps: max_scale,
					scaleStepWidth: 1,
					scaleStartValue: 0,
					scaleLabel: "<%=value%> Cards",
					datasetStrokeWidth: 5,
					animation: false
				});
			});
		});
	};

	/* ======================================= */
	/* ====== REGISTER PRACTICE SESSION ====== */
	/* ======================================= */

	Statistics.registerPracticeSession = function(stack, score, total) {

		var exists = false;

		[].forEach.call(App.DB.Statistics.objectStoreNames, function(v) {

			if (v == stack) {
				exists = true;
				return false;
			}
		});

		if (!exists) {

			var args = arguments;
			var _this = this;

			App.DB.createObjectStore("Statistics", stack, null, function() {
				Statistics.registerPracticeSession.apply(_this, args);
			});

			return;
		}

		App.DB.addData("Statistics", stack, {
			score: score,
			total: total,
			timestamp: new Date().getTime()
		});
	};

	return Statistics;
})