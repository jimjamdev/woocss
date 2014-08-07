module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    require('time-grunt')(grunt);

    grunt.initConfig({


        // == Task List ==============================================




        
        sass: {                                    // task
            production: {                              // target
                files: {                        // dictionary of files
                    'css/app.css': 'sass/app.scss'        // 'destination': 'source'
                }
            },
        },

        uncss: {
          dist: {
            options: {
              ignore       : ['#added_at_runtime', /offcanvas-*/, /oldie/, /active/, /hover/, /thin/],
              media        : ['*'],
              ignoreSheets : [/fonts.googleapis/],
              timeout      : 1000
            },
            files: {
              'css/app.css': ['html/index.html']
            }
          }
        },

        autoprefixer: {
            single_file: {
              options: {
                browsers: ['last 3 version']
              },
              src: 'css/app.css'
            },
          },

        // Merge Javascript Files
        concat: {
            app: { 
                src: [
                    //'app/bower_components/jquery/dist/jquery.js',
                ],
                dest: 'js/app.js'
            },
             defer: { 
                src: [
                    //'app/bower_components/slick/slick/slick.js',
                    'app/bower_components/owl/dist/owl.carousel.js',
                    //'ec-components/js/app.defer.js'
                ],
                dest: 'js/app.defer.js'
            }
        },

        // Compress Javascript
        uglify: {
            build: {
                files: {
                    'js/app.js': ['js/app.js'],
                    'js/app.defer.js': ['js/app.defer.js'],
                    'js/old.browser.js': ['js/old.browser.js'] 
                }
            }
        },

        // Remove unused css selectors. Currently not used until I work out js based css.
        /*uncss: {
          dist: {
            files: {
              'css/ecenglish/app.uncss.css': ['http://ecenglish.html/_design/html/', 'http://ecenglish.html/_design/html/destination.php']
            }
          }
        },*/

        // Compress CSS
        cssmin: {
            combine: {
                files: {
                    'css/app.css': ['css/app.css'],
                    //'css/ecenglish/app.tiny.min.css': ['css/ecenglish/app.tiny.css']
                }
            }
        },


        // == Watch List =============================================

        watch: {
            files: ['GruntFile.js', 'html/*', 'css/*', 'img/*', 'js/*', 'img/*'],
            options: {
                livereload: 9000,
                spawn: false,
            },
            sass: {
                files: ['GruntFile.js', '**/*.scss', 'bower_components/**/*', 'app/bower__components/**/*', 'ec-components/**/*'],
                tasks: ['sass', 'autoprefixer', 'uncss', 'cssmin'],
                options: {
                    spawn: false,
                }
            },
            js: {
                files: ['GruntFile.js', 'ec-components/js/**/*.js', 'ecenglish/*/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                }
            },

        }

    });

    grunt.registerTask('default', 'watch');

}