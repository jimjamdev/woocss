module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({


        // == Task List ==============================================



        compass: {
            build: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        // Use once lib-sass has been updated to work with @extend and %placeholder    
        /*sass: {                                 // task
            dist: {   
            options: {
                outputStyle: 'compressed'
            },                          // target
                files: {                        // dictionary of files
                    'woocss.css': 'woocss.scss'     // 'destination': 'source'
                }
            }
        },*/ 

        // Merge Javascript Files
        concat: {
            js: {
                src: [
                    'vendor/components/jquery/jquery.js',
                ],
                dest: 'js/app.js'
            }
        },

        // Compress Javascript
        uglify: {
            build: {
                files: {
                    'js/app.min.js': ['js/app.js']
                }
            }
        },



        // == Watch List =============================================

        watch: {
            files: ['GruntFile.js', 'docs/*', '/*', 'img/*', 'js/*'],
            options: {
                livereload: true,
                spawn: false,
            },
            sass: {
                files: ['GruntFile.js', '**/*.scss', 'libs/**/*', 'sass/**/*'],
                tasks: ['sass']
            },
            js: {
                files: ['GruntFile.js', 'libs/woojs/**/*.js', 'js/**/*.js'],
                tasks: ['concat', 'uglify']
            },

        }

    });

    grunt.registerTask('default', 'watch');

}
