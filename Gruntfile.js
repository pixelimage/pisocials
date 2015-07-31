module.exports = function(grunt) {

	grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        banner: "/*\n* <%= pkg.name %> - v<%= pkg.version %>\n" +
        "* update <%= grunt.template.today('yyyy-mm-dd') %>\n" +
        "* copyright <%= pkg.author %>\n" +
        "* license MIT\n*/\n",
        clean: {
            files: ["dist"]
        },
        jshint: {
            options: {
                reporter: require("jshint-stylish")
            },
            src: {
                options: {
                    jshintrc: "src/.jshintrc"
                },
                src: ["src/*.js"]
            }
        },
		dataUri: {
			dist: {
				src: ['css/*.css'],
				dest: 'dist',
				options: {
					target: ['css/images/*.*'],
					fixDirLevel: true,
					maxBytes: 2048
				}
			}
		},
		autoprefixer: {
		    options: {
		      browsers: ['last 2 version', 'ie 8', 'ie 9']
		    },
			target: {
				src: 'dist/*.css',
				dest: ''
			}
		},
		concat: {
            options: {
                banner: "<%= banner %>"
            },
			dist: {
				src: 'src/*.js',
				dest: 'dist/<%= pkg.name %>.js'
		    }
		},
		
	    watch: {
	      main: {
	        files: ['./src/*.js','./css/*.css'],
	        tasks: ['clean','autoprefixer','dataUri', 'concat']
	      }
	    }
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('default', ['clean','autoprefixer','dataUri', 'concat']);
};