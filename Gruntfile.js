'use strict';

module.exports = function(grunt) {

   // Load grunt tasks automatically
   require('load-grunt-tasks')(grunt);
   // Time how long tasks take.
   require('time-grunt')(grunt);

   // Configurable paths for the application
   var appConfig = {
      pkg: grunt.file.readJSON('package.json'),
      app: require('./package.json').appPath || 'app',
      dist: 'dist',
      build: 'build'
   };

   // Configuration.
   grunt.initConfig({
      // Settings
      Config: appConfig,

      watch: {
         bower: {
            files: ['bower.json'],
            tasks: ['wiredep']
         },
         js: {
            files: ['<%= Config.app %>/scripts/{,*/}*.js'],
            tasks: ['newer:jshint:all'],
            options: {
               livereload: '<%= connect.options.livereload %>'
            }
         },
         compass: {
            files: ['<%= Config.app %>/styles/{,*/}*.{scss,sass}'],
            tasks: ['compass:server', 'autoprefixer']
         },
         gruntfile: {
            files: ['Gruntfile.js']
         },
         livereload: {
            options: {
               livereload: '<%= connect.options.livereload %>'
            },
            files: [
            '<%= Config.app %>/{,*/}*.html',
            '.tmp/styles/{,*/}*.css',
            '<%= Config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
         }
      },

      // grunt server settings
      connect: {
         options: {
            port: 8000,
            // Change this to '0.0.0.0' to access the server from outside.
            hostname: 'localhost',
            // change this port to prevent error
            livereload: 99999
         },
         livereload: {
            options: {
               open: true,
               middleware: function (connect) {
                  return [
                     connect.static('.tmp'),
                     connect().use(
                     '/bower_components',
                     connect.static('./bower_components')
                     ),
                     connect.static(appConfig.app)
                  ];
               }
            }
         },
         dist: {
            options: {
               open: true,
               base: '<%= Config.dist %>'
            }
         }
      },

      // Make sure code styles are up to par and there are no obvious mistakes
      jshint: {
         options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
         },
         all: {
            src: [
               'Gruntfile.js',
               '<%= Config.app %>/scripts/{,*/}*.js'
            ]
         },
      },


      // Clean temporary folders to start fresh
      clean: {
         dist: {
            files: [{
               dot: true,
               src: [
                  '.tmp',
                  '<%= Config.dist %>/{,*/}*',
                  '!<%= Config.dist %>/.git{,*/}*'
               ]
            }]
         },
         server: '.tmp'
      },

      // Add vendor prefixed styles
      autoprefixer: {
         options: {
            browsers: ['last 1 version']
         },
         dist: {
            files: [{
               expand: true,
               cwd: '.tmp/styles/',
               src: '{,*/}*.css',
               dest: '.tmp/styles/'
            }]
         }
      },

      // Automatically inject Bower components into the app
      wiredep: {
         app: {
            src: ['<%= Config.app %>/index.html'],
            ignorePath:  /\.\.\//
         },
         sass: {
            src: ['<%= Config.app %>/styles/{,*/}*.{scss,sass}'],
            ignorePath: /(\.\.\/){1,2}bower_components\//
         }
      },

      // Compiles Sass to CSS and generates necessary files if requested
      compass: {
         options: {
            sassDir: '<%= Config.app %>/styles',
            cssDir: '.tmp/styles',
            generatedImagesDir: '.tmp/images/generated',
            imagesDir: '<%= Config.app %>/images',
            javascriptsDir: '<%= Config.app %>/scripts',
            fontsDir: '<%= Config.app %>/styles/fonts',
            importPath: './bower_components',
            httpImagesPath: '/images',
            httpGeneratedImagesPath: '/images/generated',
            httpFontsPath: '/styles/fonts',
            relativeAssets: false,
            assetCacheBuster: false,
            raw: 'Sass::Script::Number.precision = 10\n'
         },
         dist: {
            options: {
               outputStyle: 'compressed',
               noLineComments: true,
               generatedImagesDir: '<%= Config.dist %>/images/generated'
            }
         },
         server: {
            options: {
               debugInfo: true
            }
         }
      },

      // Renames files for browser caching purposes
      filerev: {
         dist: {
            src: [
               '<%= Config.dist %>/scripts/{,*/}*.js',
               '<%= Config.dist %>/styles/{,*/}*.css',
               '<%= Config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
               '<%= Config.dist %>/styles/fonts/*'
            ]
         }
      },

      // Reads HTML for usemin blocks to enable smart builds that automatically
      // concat, minify and revision files. Creates configurations in memory so
      // additional tasks can operate on them
      useminPrepare: {
         html: '<%= Config.app %>/index.html',
         options: {
            dest: '<%= Config.dist %>',
            flow: {
               html: {
                  steps: {
                     js: ['concat', 'uglifyjs'],
                     css: ['cssmin']
                  },
                  post: {}
               }
            }
         }
      },

      // Performs rewrites based on filerev and the useminPrepare configuration
      usemin: {
         html: ['<%= Config.dist %>/{,*/}*.html'],
         css: ['<%= Config.dist %>/styles/{,*/}*.css'],
         options: {
            assetsDirs: ['<%= Config.dist %>','<%= Config.dist %>/images']
         }
      },

      imagemin: {
         dist: {
            files: [{
               expand: true,
               cwd: '<%= Config.app %>/images',
               src: '{,*/}*.{png,jpg,jpeg,gif}',
               dest: '<%= Config.dist %>/images'
            }]
         }
      },

      svgmin: {
         dist: {
            files: [{
               expand: true,
               cwd: '<%= Config.app %>/images',
               src: '{,*/}*.svg',
               dest: '<%= Config.dist %>/images'
            }]
         }
      },

      // ng-annotate tries to make the code safe for minification automatically
      // by using the Angular long form for dependency injection.
      ngAnnotate: {
         dist: {
            files: [{
               expand: true,
               cwd: '.tmp/concat/scripts',
               src: ['*.js', '!oldieshim.js'],
               dest: '.tmp/concat/scripts'
            }]
         }
      },

      // Copies remaining files to places other tasks can use
      copy: {
         dist: {
            files: [{
               expand: true,
               dot: true,
               cwd: '<%= Config.app %>',
               dest: '<%= Config.dist %>',
               src: [
                  '*.{ico,png,txt}',
                  '.htaccess',
                  '*.html',
                  'views/{,*/}*.html',
                  'images/{,*/}*.{webp}',
                  'fonts/{,*/}*.*'
               ]
            }, {
               expand: true,
               cwd: '.tmp/images',
               dest: '<%= Config.dist %>/images',
               src: ['generated/*']
            }]
         },
         styles: {
            expand: true,
            cwd: '<%= Config.app %>/styles',
            dest: '.tmp/styles/',
            src: '{,*/}*.css'
         }
      },

      // Run some tasks in parallel to speed up the build process
      concurrent: {
         server: [
            'compass:server'
         ],
         test: [
            'compass'
         ],
         dist: [
            'compass:dist',
            'imagemin',
            'svgmin'
         ]
      }

   });


   grunt.registerTask('default', 'Compile then start a connect web server', function (target) {
      if (target === 'dist') {
         return grunt.task.run(['build', 'connect:dist:keepalive']);
      }

      grunt.task.run([
         'clean:server',
         'wiredep',
         'concurrent:server',
         'autoprefixer',
         'connect:livereload',
         'watch'
      ]);
   });

   grunt.registerTask('build', [
      'clean:dist',
      'wiredep',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'concat',
      'ngAnnotate',
      'copy:dist',
      'cssmin',
      'uglify',
      'filerev',
      'usemin'
   ]);

};
