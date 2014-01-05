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

					var tags = data.tags || [];
					if (typeof tags == "string") { tags = JSON.parse(tags); }

					Router.$page.find(".stack-name").html("<span style='font-weight: 500;'>" + stack.category + "</span> // " + stack.name);
					Router.$page.find("textarea[name=front]").val(App.Utils.unescapeHTML(data.front));
					Router.$page.find("textarea[name=back]").val(App.Utils.unescapeHTML(data.back));
					Router.$page.find("input[name=tags]").val(tags.join(", "));
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
					App.$("select.from").find("option[value=" + prefs.from + "]").attr("selected", "selected");
					App.$("select.to").find("option[value=" + prefs.to + "]").attr("selected", "selected");
				}
			});
		},

		"page-search": function() {

			delete App.Stacks.current;
			Router.$page.find(".loading").show();

			App.Settings.export_json(function(data) {

				App._search = [];

				Object.keys(data).forEach(function(category) {
					Object.keys(data[category]).forEach(function(stack) {
						data[category][stack].forEach(function(v) {

							v.category = category;
							v.stack = stack;

							v.value.tags = v.value.tags || [];
							if (typeof v.value.tags == "string") { v.value.tags = JSON.parse(v.value.tags); }

							v.value.score = v.value.score || {front:{yes:0,no:0},back:{yes:0,no:0}};
							if (typeof v.value.score == "string") { v.value.score = JSON.parse(v.value.score); }

							v.value.score_front = v.value.score.front.yes - v.value.score.front.no;
							v.value.score_back = v.value.score.back.yes - v.value.score.back.no;

							App._search.push(v);
						});
					});
				});

				var $flashcards = Router.$page.find(".flashcards");

				if (App._search.length) {
					App._search.forEach(function(v) {

						var class_front = "", class_back = "";

						if (v.value.score_front) { class_front = v.value.score_front > 0 ? "green" : "red"; }
						if (v.value.score_back) { class_back = v.value.score_back > 0 ? "green" : "red"; }

						$flashcards.append(
							"<tr data-key='" + v.key + "' data-stackID='" + v.value.stackID + "'>" +
								"<td><label><input type='checkbox'><span></span></label></td>" +
								"<td><span class='score " + class_front + "'>[" + Math.abs(v.value.score_front) + "]</span> " + App.Utils.markdown(v.value.front) + "</td>" +
								"<td><span class='score " + class_back + "'>[" + Math.abs(v.value.score_back) + "]</span> " + App.Utils.markdown(v.value.back) + "</td>" +
							"</tr>"
						);
					});

					Router.$page.find(".note, .loading").hide();
					Router.$page.find(".flashcard-actions-container").show();
					$flashcards.show();

				} else {
					Router.$page.find(".loading").hide();
					Router.$page.find(".note").show();
				}
			}, true);
		},

		"page-stack": function(stackID) {

			// Get stack name
			App.Stacks.get(+stackID, function(stack) {

				App._search = [];

				// Get all flashcards for that stack
				App.Flashcards.getAll(+stackID, function(data) {

					App.Flashcards.current = data || [];
					Router.$page.find(".stack-name").html("<span style='font-weight: 500;'>" + stack.category + "</span> // " + stack.name);
					var $flashcards = Router.$page.find(".flashcards");

					if (data.length) {
						data.forEach(function(v) {

							v.stack = stack.name;
							v.category = stack.category;
							v.value.tags = v.value.tags || [];
							if (typeof v.value.tags == "string") { v.value.tags = JSON.parse(v.value.tags); }

							v.value.score = v.value.score || {front:{yes:0,no:0},back:{yes:0,no:0}};
							if (typeof v.value.score == "string") { v.value.score = JSON.parse(v.value.score); }

							v.value.score_front = v.value.score.front.yes - v.value.score.front.no;
							v.value.score_back = v.value.score.back.yes - v.value.score.back.no;

							var class_front = "", class_back = "";

							if (v.value.score_front) { class_front = v.value.score_front > 0 ? "green" : "red"; }
							if (v.value.score_back) { class_back = v.value.score_back > 0 ? "green" : "red"; }

							$flashcards.append(
								"<tr data-key='" + v.key + "'>" +
									"<td><label><input type='checkbox'><span></span></label></td>" +
								"<td><span class='score " + class_front + "'>[" + Math.abs(v.value.score_front) + "]</span> " + App.Utils.markdown(v.value.front) + "</td>" +
								"<td><span class='score " + class_back + "'>[" + Math.abs(v.value.score_back) + "]</span> " + App.Utils.markdown(v.value.back) + "</td>" +
								"</tr>"
							);

							App._search.push(v);
						});

						Router.$page.find(".note").hide();
						Router.$page.find(".flashcard-actions-container").show();
						$flashcards.show();

					} else { Router.$page.find(".note").show(); }
				});
			});
		}
	};

	Router.registerArgs = function(page, args) {
		if (["stack", "stack-settings", "flashcard-edit", "flashcard-new"].indexOf(page) != -1) {
			App.Stacks.current = +window.location.hash.split(":")[1];
		}
	};

	/* =================== */
	/* ====== ROUTE ====== */
	/* =================== */

	Router.route = function(p) {

		var page = typeof p == "string" ? p : window.location.hash.substr(1),
		    args = page.split(":"),
		    hash = args.shift(),
		    $pageCurrent,
		    $pageNext;

		if (!hash || !$("#" + hash).length) { hash = "page-stacks"; }

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
			App.$("html").attr("class", hash);
			Router.currentPage = hash;
			$pageNext.show();
		}
	};

	return Router;
});