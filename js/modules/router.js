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

		window.addEventListener("hashchange", Router.route, false);
		Router.route();
	};

	/* ==================== */
	/* ====== ROUTES ====== */
	/* ==================== */

	Router.routes = {

		"page-statistics": function() {
			App.Statistics.updateView();
		},

		"page-stack": function(stack) {
			App.Flashcards.list(stack, function(data) {

				Router.$page.find(".stack-name").html(stack);
				var $flashcardList = $("#flashcardList");
				var actions = "<span class='fa fa-pencil edit-flashcard'></span><span class='fa fa-times remove-flashcard'></span>";

				if (data.length) {

					data.forEach(function(v) {
						$flashcardList.append(
							"<tr data-key='" + v.key + "'>" +
								"<td>" + v.front + "</td>" +
								"<td>" + v.back + "</td>" +
								"<td width='98'>" + actions + "</td>" +
							"</tr>"
						);
					});

					Router.$page.find(".note").remove();
					$flashcardList.show();
				}
			});
		},

		"page-new-flashcard": function(stack) {
			Router.$page.find(".stack-name").html(stack);
		},

		"page-edit-flashcard": function(stack, key) {
			Router.$page.find(".stack-name").html(stack);
			Router.$page.attr("data-key", key);

			App.Flashcards.get(stack, key, function(data) {
				Router.$page.find("textarea[name=front]").val(data.front);
				Router.$page.find("textarea[name=back]").val(data.back);
			});
		},

		"page-practice": function(stack) {
			App.Stacks.practice(stack);
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

		// Route to the new page
		if ($pageNext.attr("data-role") == "page") {
			App.$("body").attr("data-page", hash);
			Router.currentPage = hash;
			$pageNext.show();
		}

		// Call route function
		if(Router.routes[hash])
		{ Router.routes[hash].apply(this, args); }
	};

	return Router;
})