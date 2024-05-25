var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify'),
    package = require('./package.json'),
    nodemon = require('nodemon'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    fs = require('fs'),
    print = require('gulp-print'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');

var getIncludesByType = function(type, includePublicPath) {
    var allIncludes = [];
    var data = fs.readFileSync('./public/static/posts.json', 'utf8');

    var posts = JSON.parse(data).posts;
    var post;
    for(var i=0; i<posts.length; i++) {
        post = posts[i];
        var includes = post.includes;
        if(!!includes) {
            includes = includes
                .filter(function(include) {
                    if(include.type == type) {
                        return true;
                    }

                    return false;
                }).map(function(include) {
                    if(includePublicPath === true) {
                        return './public' + include.path;
                    }

                    return include.path;
                });

            allIncludes = allIncludes.concat(includes);
        }
    }
