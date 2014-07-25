module.exports = function(grunt) {

    'use strict';

    //Carregar os plugins
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    //iniciar as configurações das tarefas
    grunt.initConfig({

        //Carregar Plugins instalados
        pkg: grunt.file.readJSON('package.json'),
        
        //
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: true
                    }
                },
                files: {
                    "build/index.html": ["source/index.jade"]
                }
            }
        },

        //Tarefa de trocar os links de referências nos arquivos html
        processhtml: {
            deploy: {
                options: {
                    process: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**/*.html'],
                        dest: 'release/',
                        ext: '.html'
                    }
                ]
            }
        },

        //Tarefa de copiar itens
        copy: {
            main: {
                files: [
                    // includes files within path PASTA
                    //{expand: true, src: ['build/*.html'], dest: 'release/', filter: 'isFile'},

                    // flattens results to a single level INDEX
                    //{expand: true, flatten: true, src: ['build/*.html'], dest: 'release/', filter: 'isFile'}
                    // includes files within path and its sub-directories
                    //{expand: true, src: ['path/**'], dest: 'dest/'},

                    // makes all src relative to cwd
                    {expand: true, cwd: 'build/', src: ['*.html'], dest: 'release/'},

                ]
            }
        },
        
        //
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**/*.html'],
                        dest: 'release/',
                        ext: '.html'
                    }
                ]
            }
        },

        //Tarefa de juntar os CSS de desenvolvimento e colocar em um só na build
        cssmin: {
            combine: {
                files: {
                    'release/css/main.css': ['vendor/css/normalize.css',
                                             'build/css/*.css']
                }
            }
        },

        //
        coffee: {
            compile: {
                files: {
                    'build/js/main.js': 'source/coffees/main.coffee'
                }
            }
        },
        
        //Tarefa de compilar SCSS para CSS
        sass: {
            compile: {
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    sourcemap: true
                },
                expand: true,
                cwd: './source/sass/',
                src: ['*.scss'],
                dest: './build/css/',
                ext: '.css'
            }
        }

        //final das configurações das tarefas
    });

    //Tarefa default de desenvolvimento
    grunt.registerTask('default', ['sass', 'coffee', 'jade']);
    grunt.registerTask('release', ['cssmin', 'processhtml', 'htmlmin']);
    
    grunt.registerTask('printenv', function () { console.log(process.env); });

};