module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-wrap');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    removeCombined: true,
                    findNestedDependencies: true,
                    dir: 'dist',

                    modules: [
                        {
                            name: "main",
                            //exclude: ['core'],
                            include: ['angular', 'jquery']
                        },
                        {
                            name: "core"
                        },
                        {
                            name: "app/record/record",
                            exclude: ['core']
                        },
                        {
                            name: "app/search/search",
                            exclude: ['core']
                        },
                        {
                            name: "app/workspaces/workspaces",
                            exclude: ['core']
                        },
                        {
                            name: "app/admin/admin",
                            exclude: ['core']
                        }
                    ],

                    fileExclusionRegExp: /^(?:node_modules|Web.config|Properties|App_Start|bin|obj|(?:r|build|min)\.js)$/,

                    //separateCSS: true,
                    wrap: true,
                    mainConfigFile: 'main.js',
                    preserveLicenseComments: false,
                    optimize: 'uglify2',
                    //optimize: 'none',
                    uglify2:{
                        mangle: false
                    },
                    //include: ['lib/require/require'],
                    onBuildRead: function (moduleName, path, contents) {
                        return require('ngmin').annotate(contents);
                    },
                    pragmas: {
                        production: true
                    },
                    compile: {
                        options: {
                            paths: {
                                'templates':'empty:',
                            }
                        }
                    }
                }
            }
        },
        html2js: {
            main: {
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    },
                    base: './'
                },
                src: ['app/**/*.html', 'common/**/*.html'],
                dest: 'templates.js'
            }
        },
        wrap: {
            basic: {
                src: ['templates.js'],
                dest: 'templates.js',
                options: {
                    wrapper: ['define(["angular"], function (angular) {\n',
                        '\n });']
                }
            }
        }
    });

    grunt.registerTask('default', ['html2js', 'wrap', 'requirejs']);
    
    return grunt;
};