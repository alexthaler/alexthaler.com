module.exports = function (grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'css/main.css':'sass/main.sass'	
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask('default', ['sass']);

	grunt.registerTask('build', ['sass'], function() {
		grunt.log.writeln('starting build process');
		shell = require('shelljs');
		shell.exec('rm -r dist/*')
		shell.exec('cp index.html dist/')
		shell.exec('cp -r css dist/')
		shell.exec('cp -r img dist/')
	})
}