/**
 * Created by Pavel on 9.3.14.
 */
module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        sass: {                                    // Task
            dev: {
                options: {
                    includePaths: [__dirname + '/Frontend/styles/'],
                    outputStyle: 'nested'
                },// Target
                files: {                        // Dictionary of files
                    'Frontend/styles/application.css': [__dirname + '/Frontend/styles/style.scss']
                }
            }
        },
        watch: {
            options: {
                dateFormat: function(time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                }
            },
            css:{
                files: __dirname + '/Frontend/styles/style.scss',
                tasks: ['sass']
            }
        }
    });
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
}