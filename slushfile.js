/*
 * slush-test
 * https://github.com/yvorojas/slush-test
 *
 * Copyright (c) 2016, Yvo Rojas
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function() {
    var workingDirName = path.basename(process.cwd()),
        homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE;
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    } else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(homeDir, '.gitconfig');
    user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        appName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    };
})();

gulp.task('default', function(done) {
    var prompts = [{
        name: 'moduleName',
        message: '¿Cual es el nombre del modulo?',
        default: 'modulo'
    }, {
        name: 'dirName',
        message: '¿Cual es el nombre del directorio donde incluir los modulos?',
        default: 'www/app/modules/'
    },{
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
    }];
    //Ask
    inquirer.prompt(prompts,
        function(answers) {
            if (!answers.moveon) {
                return done();
            }
            answers.appNameSlug = _.slugify(answers.moduleName);
            answers.moduleNameUpper =  answers.moduleName.substring(0,1).toUpperCase() + answers.moduleName.substring(1,answers.moduleName.length);
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(rename(function(file) {
                    var splitName = file.basename.split('.');
                    if (file.extname != '') {
                        if (splitName.length == 1) {
                            file.basename = answers.moduleName;
                        } else {
                            file.basename = answers.moduleName + "." + splitName[1];
                        }
                    }else{
                        return;
                    }
                    /*if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }*/
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./' + answers.dirName+ answers.moduleName + '/'))
                .pipe(install())
                .on('end', function() {
                    done();
                });
        });
});
