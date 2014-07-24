module.exports = function(grunt) {

    //iniciar as configurações das tarefas
	grunt.initConfig({
        
        //Carregar Plugins instalados
		pkg: grunt.file.readJSON('package.json'),

        //Tarefa de juntar os CSS de desenvolvimento e colocar em um só na build
        cssmin: {
            combine: {
                files: {
                    'release/css/main.css': ['vendor/css/normalize.css',
                                             'build/css/*.css']
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
    

    //Carregar os plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //Tarefa default de desenvolvimento
    grunt.registerTask('default', ['sass']);
    //Tarefa final de produção
    grunt.registerTask('release', ['sass', 'cssmin']);

    //Tarefas personalizadas
	//grunt.registerTask('dev', ['watch']);

};