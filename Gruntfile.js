module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'setAsap.min.js': ['setAsap.js']
				}
			}
		}
	});

	grunt.registerTask('build', ['uglify']);

	grunt.loadNpmTasks('grunt-contrib-uglify');

};
