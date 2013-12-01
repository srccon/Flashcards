define(function() {

	var Router = {}, App;

	/* ======================== */
	/* ====== INITIALIZE ====== */
	/* ======================== */

	Router.initialize = function() {

		App = require("app");
		Router.templates = {};

		// Store page templates
		App.$("[data-template=true]").each(function() {
			Router.templates[$(this).attr("id")] = $(this).html();
		});

		// Setup routing
		window.addEventListener("hashchange", Router.route, false);
		Router.route();
	};

	/* ==================== */
	/* ====== ROUTES ====== */
	/* ==================== */

	Router.routes = {

		"page-stack": function(stackID) {

			// Get stack name
			App.Stacks.getName(+stackID, function(stackname) {

				// Get all flashcards for that stack
				App.Flashcards.getAll(+stackID, function(data) {

					Router.$page.find(".stack-name").html(stackname);
					var $flashcards = $("#flashcards");

					if (data.length) {
						data.forEach(function(v) {

							$flashcards.append(
								"<tr data-key='" + v.key + "'>" +
									"<td><label><input type='checkbox'><span></span></label></td>" +
									"<td>" + v.value.front + "</td>" +
									"<td>" + v.value.back + "</td>" +
								"</tr>"
							);
						});

						Router.$page.find(".note").hide();
						Router.$page.find(".actions").show();
						$flashcards.show();
					} else {
						Router.$page.find(".note").show();
					}
				});
			});
		},

		"page-practice": function(id) {
			App.Stacks.practice(+id);
		},

		"page-flashcard-new": function(stackID) {
			App.Stacks.getName(+stackID, function(stackname) {
				Router.$page.find(".stack-name").html(stackname);
			});
		},

		"page-flashcard-edit": function(stackID, key) {

			// Get stack name
			App.Stacks.getName(+stackID, function(stackname) {

				// Get all flashcards for that stack
				App.Flashcards.get(+key, function(data) {

					Router.$page.find(".stack-name").html(stackname);
					Router.$page.find("textarea[name=front]").val(data.front);
					Router.$page.find("textarea[name=back]").val(data.back);
				});
			});
		},

		"page-statistics": function() {
			App.Statistics.updateView();
		},

		"page-file-browser": function() {
			if (!App.isPhoneGap) { return; }
			App.Utils.PhoneGap.currentDir = "/mnt/sdcard/";
			App.Utils.PhoneGap.updateView();
		}
	};

	/* =================== */
	/* ====== ROUTE ====== */
	/* =================== */

	Router.route = function() {

		var args = location.hash.substr(1).split(":"),
		    hash = args.shift(),
		    $pageCurrent,
		    $pageNext;

		if (!$("#" + hash).length) { hash = "page-stacks"; }

		$pageCurrent = App.$("#" + Router.currentPage);
		$pageNext = Router.$page = App.$("#" + hash);

		// Apply template if exists
		if (Router.templates[hash])
		{ $pageNext.html(Router.templates[hash]); }

		// Hide the previous page
		$pageCurrent.hide();

		// Call route function
		if (Router.routes[hash])
		{ Router.routes[hash].apply(this, args); }

		// Route to the new page
		if ($pageNext.attr("data-role") == "page") {
			App.$("body").attr("data-page", hash);
			Router.currentPage = hash;
			$pageNext.show();
		}
	};

	return Router;
});