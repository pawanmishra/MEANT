module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: {
				files: [
				// includes files within path
				{expand: true, src: ['index.js', 'package.json', 'bin/*.js', 'models/*.js', 'lib/*.js'], dest: 'build/', filter: 'isFile'},
			
				// includes files within path and its sub-directories
				{expand: true, src: ['routes/*.js'], dest: 'build/'},
			
				// includes files within path and its sub-directories
				{expand: true, src: ['public/**/*.js'], dest: 'build/'},
				
				// includes files within path and its sub-directories
				{expand: true, src: ['public/**/*.css'], dest: 'build/'},
				
				// includes files within path and its sub-directories
				{expand: true, src: ['public/**/*.html'], dest: 'build/'}
				]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.registerTask('default', ['copy']);
};