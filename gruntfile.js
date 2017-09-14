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
        dest: 'public/main/js/myApp.js',
      }
    },
    concat_css: {
      options: {
        banner: '/*! Made on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      all: {
        src: ['public/stylesheets/**/**/*.css'],
        dest: 'public/main/css/myApp.css',
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0,
        banner: '/*! Made on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      site: {
        src: ['public/main/**/myApp.css'],
        dest: 'public/main/css/myApp.min.css'
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
          'public/main/css/testLess.css': 'public/stylesheets/less/myApp.less'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! Made on <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      basic: {
        files: {
          'public/main/js/myApp.min.js': ['<%= concat.basic.dest %>']
        }
      }
    },
    jshint: {
      files: ['app.js', 'gruntfile.js', 'routes/**/*.js', 'library/**/*.js', 'config/**/*.js', 'test/**/**/*.js'],
      options: {
        // options here to override JSHint defaults
        "esversion" : 6,
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
          mocha: true,

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
        ignore:  ['node_modules/**','bower_components/**','public/**', 'apidoc/**']
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
        src: ['test/**/**/*.js']
      }
    },
    concurrent: {
      dev: {
        tasks: ['concat_css','cssmin','jshint', 'concat', 'uglify', 'nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    apidoc: {
	    uxinn: {
		    src: "routes/",
        dest: "apidoc/",
        options: {
          debug: false,
          includeFilters: [ ".*\\.js$" ],
          excludeFilters: [ "node_modules/", "apidoc/" ]
        }
	    }
	}

  });

  //grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.registerTask('default', '', function () {
    var taskList = [
      'apidoc',
      'concurrent',
      'concat_css',
      'cssmin',
      'jshint', 
      'concat', 
      'uglify', 
      'nodemon',
      'watch', 
      //'mochaTest',

    ];
    grunt.task.run(taskList);
  });

};