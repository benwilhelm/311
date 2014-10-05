module.exports = function(grunt) {

  process.env.NODE_ENV = process.env.NODE_ENV || 'development'

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-supervisor');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mongo-migrations')

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        files: {
          "public/css/styles.css": "src/less/styles.less"
        }
      }
    },
    
    migrations: {
      path: __dirname + "/migrations",
      template: grunt.file.read( __dirname + "/migrations/_template.js"),
      mongo: process.env.MONGOLAB_URI || 'mongodb://localhost/311_' + process.env.NODE_ENV,
      ext: "js"
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



  grunt.registerTask('default', ['supervisor','watch']);
  grunt.registerTask('test',['mochaTest']);
};
