module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    require('time-grunt')(grunt);

    grunt.initConfig({


        // == Task List ==============================================




        
        sass: {                                    // task
            production: {     
                options: {                 // Target options
                    style: 'compressed'
                },                           // target
                files: {                        // dictionary of files
                    'woo.css': '_woo.scss'        // 'destination': 'source'
                }
            },
        },

        // Merge Javascript Files
        concat: {
            js: { 
                src: [
                    //'vendor/components/jquery/dist/jquery.min.js',
                ],
                dest: 'js/app.js'
            }
        },

        autoprefixer: {
            options: {
              // Task-specific options go here.
            },
            your_target: {
              'app.css'
            },
          },

        // Compress Javascript
        uglify: {
            build: {
                files: {
                    'js/app.min.js': ['js/app.js']
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
        /*cssmin: {
            combine: {
                files: {
                    'css/ecenglish/app.min.css': ['css/ecenglish/app.css'],
                    //'css/ecenglish/app.tiny.min.css': ['css/ecenglish/app.tiny.css']
                }
            }
        },*/


        // == Watch List =============================================

        watch: {
            files: ['GruntFile.js', 'html/*', 'css/*', 'img/*', 'js/*', 'img/*'],
            options: {
                livereload: true,
                spawn: false,
            },
            sass: {
                files: ['GruntFile.js', '**/*.scss', 'core/**/*', 'core/components/**/*'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
            js: {
                files: ['GruntFile.js', 'core/components/**/*.js', 'js/libs/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                }
            },

        }

    });

    grunt.registerTask('default', 'watch');

}
