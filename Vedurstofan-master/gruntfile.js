module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n',
        banner: '/*! Made on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      basic: {
        src: ['public/javascripts/**/*.js'],
        dest: 'public/main/myApp.js',
      }
    },
    concat_css: {
      options: {
        banner: '/*! Made on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      all: {
        src: ['public/stylesheets/css/**/*.css'],
        dest: 'public/main/myApp.css',
      }
    },
    less: {
      development: {
        options: {
          paths: ['public/stylesheets/css/less'],
          yuicompress: true,
          optimization: 2,
          banner: '/*! Made on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          // target.css file: source.less file
          'public/main/testLess.css': 'public/stylesheets/less/myApp.less'
        }
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0,
        banner: '/*! Made on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      site: {
        src: ['public/main/myApp.css'],
        dest: 'public/main/myApp.min.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! Made on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      basic: {
        files: {
          'public/main/myApp.min.js': ['<%= concat.basic.dest %>']
        }
      }
    },
    jshint: {
      files: ['server.js', 'Gruntfile.js', 'public/javascripts/*.js', 'server/**/*.js', 'server/models/*.js', 'server/routes/*.js', 'server/config/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          boss: true,
          eqnull: true,
          node: true,
          strict: false,
          mocha: true
        }
      }
    },
    watch: {
      js: {
        files: ['public/javascripts/**/*.js'],
        tasks: ['concat:basic'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['public/stylesheets/less/**/*.less', 'public/stylesheets/css/**/*.css'],
        tasks: ['less', 'concat_css'],
        options: {
          nospawn: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'bin/www',
        ignore:  ['node_modules/**','bower_components/**','public/**']
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'testResults.txt',
          quiet: false, 
          colors: true,
          clearRequireCache: false 
        },
        src: ['test/**/*.js']
      }
    },
    concurrent: {
      dev: {
        tasks: ['concat_css','cssmin','jshint', 'concat', 'uglify', 'nodemon', 'watch', 'less', 'mochaTest'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
    

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-ng-template');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', '', function () {
    var taskList = [
      'concurrent',
      'concat_css',
      'cssmin',
      'jshint', 
      'concat', 
      'uglify', 
      'nodemon', 
      'watch', 
      'less',
      'mochaTest'
    ];
    grunt.task.run(taskList);
  });

};













