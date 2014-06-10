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
                    'build/css/app.css': 'woo.scss'        // 'destination': 'source'
                }
            }, 
        },

        // Merge Javascript Files
        concat: {
            js: { 
                src: [

                ],
                dest: 'build/js/app.js' 
            }
        },

        // Compress Javascript
        uglify: {
            build: {
                files: {
                    'build/js/app.min.js': ['build/js/app.js']
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
                files: ['GruntFile.js', '**/*.scss', 'sass/**/*', 'sass/modules/**/*'],
                tasks: ['sass']
            },
            js: {
                files: ['GruntFile.js', 'core/components/**/*.js', 'js/libs/**/*.js'],
                tasks: ['concat', 'uglify']
            },

        } 

    });

    grunt.registerTask('default', 'watch');

}
