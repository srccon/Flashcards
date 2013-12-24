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
	/* ====== EVENTS ====== */
	/* ==================== */

	Router.events = {

		// Show android menu
		"click .button-android-menu": function(e) {

			var $actions = App.Router.$page.find(".actions");
			$actions.toggleClass("android-menu");
			App.Utils.forceRender($("body"));
		},

		// Hide android menu
		"click": function(e) {

			var $target = App.$(e.target);
			if ($target.parent().hasClass("button-android-menu")) { $target = $target.parent(); }

			if ($target.hasClass("button-android-menu")) { return; }
			App.$(".actions").removeClass("android-menu");
		}
	};

	/* ==================== */
	/* ====== ROUTES ====== */
	/* ==================== */

	Router.routes = {

		"page-stacks": function() {
			App.Stacks.updateView();
		},

		"page-statistics": function() {
			App.Statistics.updateView();
		},

		"page-quiz": function(id) {
			App.Stacks.quiz.initialize(+id);
		},

		"page-practice": function(id) {
			App.Stacks.practice.initialize(+id);
		},

		"page-flashcard-new": function(stackID) {
			App.Stacks.get(+stackID, function(stack) {
				Router.$page.find(".stack-name").html("<span style='font-weight: 500;'>" + stack.category + "</span> // " + stack.name);
			});
		},
		
		"page-file-browser": function() {
			if (!App.isPhoneGap) { return; }
			App.Utils.PhoneGap.currentDir = "/mnt/sdcard/";
			App.Utils.PhoneGap.updateView();
		},

		"page-flashcard-edit": function(stackID, key) {

			// Get stack name
			App.Stacks.get(+stackID, function(stack) {

				// Get all flashcards for that stack
				App.Flashcards.get(+key, function(data) {

					Router.$page.find(".stack-name").html("<span style='font-weight: 500;'>" + stack.category + "</span> // " + stack.name);
					Router.$page.find("textarea[name=front]").val(data.front);
					Router.$page.find("textarea[name=back]").val(data.back);
				});
			});
		},

		"page-stack-settings": function(stackID) {

			// Get stack name
			App.Stacks.get(+stackID, function(stack) {
				Router.$page.find(".stack-name").html("<span style='font-weight: 500;'>" + stack.category + "</span> // " + stack.name);

				var prefs = App._settings.translation_preferences && App._settings.translation_preferences[stackID];
				var $select = App.$("select.languages");

				App.Flashcards.translate.languages.forEach(function(v, i) {
					var code = App.Flashcards.translate.language_codes[i];
					$select.append("<option value='" + code + "'>" + v + "</option>");
				});

				if (prefs) {
					App.$("select.from").find("option[value=" + prefs.from + "]").attr("selected", "selected")
					App.$("select.to").find("option[value=" + prefs.to + "]").attr("selected", "selected")
				}
			});
		},

		"page-stack": function(stackID) {

			// Get stack name
			App.Stacks.get(+stackID, function(stack) {

				// Get all flashcards for that stack
				App.Flashcards.getAll(+stackID, function(data) {

					Router.$page.find(".stack-name").html("<span style='font-weight: 500;'>" + stack.category + "</span> // " + stack.name);
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
						Router.$page.find(".flashcard-actions-container").show();
						$flashcards.show();
					} else {
						Router.$page.find(".note").show();
					}
				}, true);
			});
		}
	};

	Router.registerArgs = function(page, args) {
		if (["stack", "stack-settings", "practice", "quiz", "flashcard-edit", "flashcard-new"].indexOf(page) != -1) {
			App.Stacks.current = +window.location.hash.split(":")[1];
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

		// Register arguments in sub modules
		Router.registerArgs(hash.substr(5));

		// Call route function
		if (Router.routes[hash])
		{ Router.routes[hash].apply(this, args); }

		// Route to the new page
		if ($pageNext.hasClass("page")) {
			App.$("html").attr("data-page", hash);
			Router.currentPage = hash;
			$pageNext.show();
		}
	};

	return Router;
});