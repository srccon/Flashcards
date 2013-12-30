module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		sass: {
			dist: {
				options: {
					outputStyle: "compressed"
				},
				files: {
					"www/build/build.css": "src/css/main.scss"
				}
			}
		},

		requirejs: {
			compile: {
				options: {
					name: "main",
					baseUrl: "src/js",
					out: "www/build/build.js",
					mainConfigFile: "src/js/main.js",
					include: ["libs/prefixfree.js", "libs/require.js"]
				}
			}
		}
	});

	Object.keys(grunt.config.data.pkg.devDependencies).forEach(function(v) {
		if (v == "grunt") { return true; }
		grunt.loadNpmTasks(v);
	});

	grunt.registerTask("default", ["sass", "requirejs"]);

};
