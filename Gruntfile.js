module.exports = function (grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'css/main.css':'sass/main.sass'	
				}
			}
		}, 
		rsync: {
			dist: {
				src: "dist/.",
				dest: "/home/aletha3/alexthaler.com",
				host: "aletha3@muphrid.dreamhost.com",
				recursive: "true"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask('default', ['sass']);

	grunt.registerTask('build', ['sass'], function() {
		grunt.log.writeln('starting build process');
		shell = require('shelljs');
		shell.exec('rm -r dist/*');
		shell.exec('touch dist/dont_delete')
		shell.exec('cp index.html dist/');
		shell.exec('cp -r css dist/');
		shell.exec('cp -r img dist/');
	});

	grunt.registerTask('rsync', ['build'], function() {
		grunt.log.writeln('deploying to muphrid');
		shell = require('shelljs');
		shell.exec('rsync -r dist/* aletha3@muphrid.dreamhost.com:/home/aletha3/alexthaler.com --rsh=ssh')
	})

	grunt.registerTask('deploy', 'deploy', function() {
		grunt.task.run('sass', 'build', 'rsync');
	});
}