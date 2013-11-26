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

		"page-stack": function(id) {
			App.Stacks.getName(+id, function(stackname) {
				App.Flashcards.getAll(+id, function(data) {

					Router.$page.find(".stack-name").html(stackname);
					var $flashcardList = $("#flashcardList");
					var actions = "<span class='fa fa-pencil edit-flashcard'></span><span class='fa fa-times remove-flashcard'></span>";

					if (data.length) {

						data.forEach(function(v) {
							$flashcardList.append(
								"<tr data-key='" + v.key + "'>" +
									"<td>" + v.value.front + "</td>" +
									"<td>" + v.value.back + "</td>" +
									"<td width='98'>" + actions + "</td>" +
								"</tr>"
							);
						});

						Router.$page.find(".note").remove();
						$flashcardList.show();
					}
				});
			});
		},

		"page-new-flashcard": function(stackID) {
			App.Stacks.getName(+stackID, function(stackname) {
				Router.$page.find(".stack-name").html(stackname);
			});
		},

		"page-edit-flashcard": function(stackID, key) {

			App.Stacks.getName(+stackID, function(stackname) {
				Router.$page.find(".stack-name").html(stackname);
				App.Flashcards.get(+key, function(data) {
					console.log(data);
					Router.$page.find("textarea[name=front]").val(data.front);
					Router.$page.find("textarea[name=back]").val(data.back);
				});
			});
		},

		"page-practice": function(id) {
			App.Stacks.practice(+id);
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
})