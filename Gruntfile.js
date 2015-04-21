module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      vendor: {
        src: ['lib/index.js'],
        dest: 'browser/mike-crow.js',
        options: {
          browserifyOptions: {
            standalone: 'MikeCrow'
          }
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> version <%= pkg.version %> by <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'browser/<%= pkg.name %>.js',
        dest: 'browser/<%= pkg.name %>.min.js'
      }
    },
    clean: ['browser/mike-crow.js']
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['browserify', 'uglify', 'clean']);

};
