module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		ts: {
			default: {
				src: ['public/**/*.ts'],
				options: {
					sourceMap: false,
					'module': "commonjs"
				}
			}
		},
		copy: {
			main: {
				files: [
					// includes files within path
					{expand: true, src: ['index.js', 'package.json', 'bin/*.js', 'models/*.js', 'lib/*.js'], dest: 'build/', filter: 'isFile'},
				
					// includes files within path and its sub-directories
					{expand: true, src: ['routes/*.js'], dest: 'build/'},
				
					// includes files within path and its sub-directories
					{expand: true, src: ['public/**/*.js', 'public/**/*.css', 'public/**/*.png', 'public/**/*.gif'], dest: 'build/'},
					
					// includes files within path and its sub-directories
					{expand: true, src: ['public/**/*.html'], dest: 'build/'}
				]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.registerTask('default', ['copy']);
};