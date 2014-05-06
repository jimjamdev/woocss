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
            files: ['GruntFile.js', 'html/*', 'css/*', 'img/*', 'js/*', 'img/*'],
            options: {
                livereload: true,
                spawn: false,
            },
            sass: {
                files: ['GruntFile.js', '**/*.scss', 'core/**/*', 'core/components/**/*'],
                tasks: ['compass']
            },
            js: {
                files: ['GruntFile.js', 'core/components/**/*.js'],
                tasks: ['concat', 'uglify']
            },

        }

    });

    grunt.registerTask('default', 'watch');

}
