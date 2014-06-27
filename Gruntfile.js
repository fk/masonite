module.exports = function(grunt) {

  'use strict';

  var bower = 'app/components/';
  var build = 'build/';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */',
    clean: {
      build: ["build"],
      uncompressed: [
        build + 'js/<%= pkg.name %>.js',
        build + 'js/infinitescroll.js',
        build + 'css/colorbox.css',
        build + 'css/masonite.css',
        build + 'css/normalize.css'
      ]
    },
    copy: {
      jquery: {
        src: bower + 'jquery/dist/jquery.min.js',
        dest: build + 'js/jquery.min.js',
      },
      colorbox: {
        src: bower + 'colorbox/jquery.colorbox-min.js',
        dest: build + 'js/jquery.colorbox-min.js'
      },
      placeholder: {
        src: bower + 'html5-placeholder-polyfill/dist/placeholder_polyfill.min.css',
        dest: build + 'css/placeholder_polyfill.min.css'
      }
    },
    concat: {
      masonite: {
        options: {
          separator: ';'
        },
        src: [
          bower + '6155769/log.js',
          bower + 'jquery-smartresize/jquery.debouncedresize.js',
          bower + 'jQuery-widowFix/js/jquery.widowFix-1.3.2.js',
          bower + 'jquery.easing.1.3/index.js',
          bower + 'jquery.fitvids/jquery.fitvids.js',
          bower + 'jquery-bridget/jquery.bridget.js',
          bower + 'get-style-property/get-style-property.js',
          bower + 'get-size/get-size.js',
          bower + 'matches-selector/matches-selector.js',
          bower + 'eventEmitter/EventEmitter.js',
          bower + 'eventie/eventie.js',
          bower + 'doc-ready/doc-ready.js',
          bower + 'outlayer/item.js',
          bower + 'outlayer/outlayer.js',
          bower + 'imagesloaded/imagesloaded.pkgd.js',
          bower + 'masonry/dist/masonry.pkgd.js',
          bower + 'spinjs/spin.js',
          bower + 'spinjs/jquery.spin.js',
          'js/<%= pkg.name %>.js'
        ],
        dest: build + 'js/<%= pkg.name %>.js'
      },
      placeholder: {
        src: [
          bower + 'animation-frame/AnimationFrame.min.js',
          bower + 'html5-placeholder-polyfill/dist/placeholder_polyfill.jquery.min.combo.js'
        ],
        dest: build + 'js/placeholder.min.js'
      },
      infinitescroll: {
        src: [
          bower + 'infinite-scroll/jquery.infinitescroll.js',
          'js/manual-trigger.js'
        ],
        dest: build + 'js/infinitescroll.js'
      },
      css: {
        src: [
          bower + 'normalize-css/normalize.css',
          build + 'css/masonite.css'
        ],
        dest: build + 'css/masonite.css'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>' + '\n'
      },
      build: {
        src: build + 'js/<%= pkg.name %>.js',
        dest: build + 'js/<%= pkg.name %>.min.js'
      },
      infinitescroll: {
        src: build + 'js/infinitescroll.js',
        dest: build + 'js/infinitescroll.min.js'
      }
    },
    compass: {
      dist: {}
    },
    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      minify: {
        expand: true,
        cwd: 'build/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/',
        ext: '.min.css'
      }
    },
    modernizr: {
      dist: {
        'devFile' : 'remote',
        'outputFile' : build + 'js/modernizr.min.js',
        'files' : {
          'src': [
            'js/*.js',
            'masonite.html'
          ]
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      masonite: [
        'Gruntfile.js',
        'js/masonite.js'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', [
    'clean:build',
    'modernizr',
    'copy',
    'compass',
    'concat',
    'cssmin',
    'jshint:masonite',
    'uglify',
    'clean:uncompressed'
  ]);

};
