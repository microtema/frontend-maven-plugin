module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-maven-tasks');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({

        config: {
            sources: 'src/main/frontend',
            dist: 'dist'
        },

        jshint: {
            files: ['Gruntfile.js', 'src/main/frontend/*.js', 'src/test/frontend/*.js']
        },

        copy: {
            app: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.sources %>/',
                        src: ['**/*.*'],
                        dest: '<%= config.dist %>'
                    }
                ]
            }
        },

        maven: {
            install: {
                options: {
                    injectDestFolder: false,
                    goal: 'install',
                    groupId: 'de.seven.fate'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/',
                    src: ['**/*'],
                    dest: ''
                }]
            }
        }
    });
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', ['jshint','copy']);
    grunt.registerTask('install', ['build', 'maven:install']);
};