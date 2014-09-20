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
      scripts: {
        files: ['src/less/*.less'],
        tasks: ['less']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-supervisor');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['supervisor','watch']);
};
