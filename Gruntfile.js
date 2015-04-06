module.exports = function (grunt) {
    var files = [
                './engine/*.ts',
        './engine/**/*.ts'
    ];
    grunt.initConfig({
        ts: {
            options: {
                out: './app.js',
                target: 'es5',
                sourceMap: true,
                noImplicitAny: true
            },
            default: {
                out: './app.js',
                src: files
            }
        },
        browserify: {
            dist: {
                files: {
                    './app.js': './engine/main.js'
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        }
        
    });
    
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-ts');
    
    grunt.registerTask('default', ['ts', 'browserify']);
};