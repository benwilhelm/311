module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        files: {
          "public/css/styles.css": "src/less/styles.less"
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: [
          'test/unit/**/*.js',
          'test/integration/**/*.js'
        ]
      }
    },
    
    supervisor: {
      target: {
        script: 'server.js',
        options: {
          extensions: ["js, json, ejs"],
          forceSync: true
        }
      }
    },

    watch: {
      less: {
        files: ['src/less/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      },
      
      test: {
        files: [
          './**/*.js',
          '!./node_modules/**'
        ],
        tasks: ['mochaTest']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-supervisor');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['supervisor','watch']);
};
