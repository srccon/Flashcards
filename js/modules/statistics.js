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

	/* ================= */
	/* ====== GET ====== */
	/* ================= */

	Statistics.get = function(callback) {
		App.DB.getData("App", "Statistics", null, function(data) {
			callback(data);
		});
	};

	Statistics.updateView = function() {

		var count = 0;

		App.Statistics.get(function(data) {

			var stackdata = [];

			[].forEach.call(data, function(v) {
				if (!stackdata[v.value.stackID]) { stackdata[v.value.stackID] = []; }
				stackdata[v.value.stackID].push(v);
			});

			for (stackID in stackdata) {
				App.Stacks.getName(+stackID, function(stackname, id) {

					var data = stackdata[id];
					if (data.length < 2) { return; }

					if (!count) { App.$("#page-statistics").find("[data-role=content]").html(""); }
					count++;

					var ctx = document.createElement("canvas").getContext("2d");

					ctx.canvas.width = $("body").width() - 100;
					ctx.canvas.height = Math.round(ctx.canvas.width / 1.618);

					App.$("#page-statistics").find("[data-role=content]").append("<h1>" + stackname + "</h1><hr>");
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
			}
		});
	};

	/* ======================================= */
	/* ====== REGISTER PRACTICE SESSION ====== */
	/* ======================================= */

	Statistics.registerPracticeSession = function(id, score, total) {

		App.DB.addData("App", "Statistics", {
			stackID: +id,
			score: score,
			total: total,
			timestamp: new Date().getTime()
		});
	};

	return Statistics;
})