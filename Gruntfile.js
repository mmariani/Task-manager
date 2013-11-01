module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**********************************************
    ******* running jslint to all js files  *******
    **********************************************/
    jslint: {
      all: {
        src: [
          'js/main.js',
          'js/modules/*.js',
          'Gruntfile.js'
        ],
        exclude: [
          //'js/modules/datebox.js',
          'js/modules/pmapi.js'
        ],
        directives: { // example directives
          browser: true,
          unparam: true,
          maxlen: 80,
          indent: 2,
          nomen: true,
          predef: [
            '$',
            'jIO',
            'alert',
            'jQuery',
            'window',
            'parent',
            'define',
            'require',
            'module',
            'console',
            'confirm',
            'location',
            'document',
            'setTimeout',
            'inserttasks',
            'localStorage',
            'displaytasks',
            'insertprojects'
          ]
        },
        options: {
          failOnError: false
        }
      }
    },

    /**********************************************
    ******* running jslint to all js files  *******
    **********************************************/
    requirejs: {
      compile: {
        options: {
          appDir: "./",
          // => INFO: directory path = PRODUCTION folder
          dir: "dir",
          config: {
            text: {
              removeWhitespace: true
            }
          },
          mainConfigFile: "js/main.js",
          // INFO => base url for all js file
          baseUrl: "js",
          paths: {
            //plugins (require-css, text, json)
            css:             "plugins/requirejs-plugins/require-css/css",
            normalize:       "plugins/requirejs-plugins/require-css/normalize",
            text:            "plugins/requirejs-plugins/text/text",
            json:            "plugins/requirejs-plugins/json/json",
            //librairies (jquery, jquery mobile, jio)
            jquery:          "lib/jquery/jquery-1.10.1",
            jqm:             "lib/jquerymobile/jquery.mobile-1.4.0pre",
            sha256:          "lib/jio/sha256.amd",
            jio:             "lib/jio/jio",
            localstorage:    "lib/jio/localstorage",
            complex_queries: "lib/jio/complex_queries",
            overrides:       "modules/overrides"
          },
          shim: {
            "jquery": {exports: "$"},
            "jqm": {deps: ["jquery"], exports: "mobile"},
            "overrides": {deps: ["jquery"]}
          },
          map: {
            "*": {"css": "plugins/requirejs-plugins/require-css/css"}
          },
          //built code is transformed in some way.
          keepBuildDir: true,
          optimize: "uglify2",
          //optimize: "none",
          skipDirOptimize: false,
          //source maps as ".js.src" files.
          generateSourceMaps: false,
          normalizeDirDefines: "skip",
          //-"standard.keepComments.keepLines": keeps the file comments & line
          optimizeCss: "standard",
          inlineText: true,
          useStrict: false,
          //together.
          skipModuleInsertion: false,
          //will be placed on another domain.
          optimizeAllPluginResources: false,
          //by default.
          findNestedDependencies: true,
          //If set to true, any files that were combined into a build 
          //layer will be removed from the output folder.
          removeCombined: true,
          //only the root bundles will be included unless the locale: 
          //section is set above.
          modules: [
            {
              name: "modules/pmapi"
            }
          ],
          //RegExp via new RegExp().
          fileExclusionRegExp: /^(dir|node_modules|grunt|package|Gruntfiles)$/,
          //work out how best to surface the license information.
          preserveLicenseComments: false,
          //Sets logging level.It's a number.If you want "silent" running,
          logLevel: 0,
          //this option
          throwWhen: {
            //If there is an error calling the minifier for some JavaScript,
            //instead of just skipping that file throw an error.
            optimize: true
          },
          //read in the disables the waiting interval.
          waitSeconds: 3
        }
      }
    },

    /**************************************************
    **** running html validation to all html files ****
    **************************************************/
    validation: {
      files: {
        src: ['*.html']
      }
    },

    /**************************************************
    **** running html validation to all html files ****
    **************************************************/
    jsonlint: {
      sample: {
        src: [ 'data/tasks.json' ]
      }
    },

    /******************************************************
    ********* Generate HTML5 Cache Manifest files *********
    *******************************************************/
    manifest: {
      generate: {
        options: {
          basePath: "./",
          cache: [
            "js/modules/pmapi.js",
            "js/main.js",
            "js/lib/requirejs/require.js",
            "js/lib/jquerymobile/images/ajax-loader.gif",
            "js/lib/jquerymobile/images/icons-18-black.png",
            "js/lib/jquerymobile/images/icons-18-white.png",
            "js/lib/jquerymobile/images/icons-36-black.png",
            "js/lib/jquerymobile/images/icons-36-white.png",
            "favicon.png",
            "js/lib/jquerymobile/images/home.png"
          ],
          network: ["http://*", "https://*"],
          //exclude: ["js/jquery.min.js"],
          preferOnline: true,
          verbose: true,
          timestamp: true
        },
        src: [
          "*.html"
        ],
        dest: "dir/manifest.appcache"
      }
    },

    /******************************************************
    *** Creates manifest of files and associated hashes ***
    *******************************************************/
    "hash-manifest": {
      dist: {
        options: {
          algo: "md5",
          cwd: "dir"
        },
        src: [
          "*.html",
          "js/modules/pmapi.js",
          "js/main.js",
          "js/lib/requirejs/require.js",
          "js/lib/jquerymobile/images/ajax-loader.gif",
          "js/lib/jquerymobile/images/icons-18-black.png",
          "js/lib/jquerymobile/images/icons-18-white.png",
          "js/lib/jquerymobile/images/icons-36-black.png",
          "js/lib/jquerymobile/images/icons-36-white.png",
          "favicon.png",
          "js/lib/jquerymobile/images/home.png"
        ],
        dest: "MANIFEST"
      }
    }
  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-hash-manifest');

  grunt.registerTask(
    'default',
    [ 'jslint',
      'requirejs',
      'validation',
      'jsonlint',
      'manifest',
      'hash-manifest'
      ]
  );
};