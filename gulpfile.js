var

    // built in packages
    spawn = require('child_process').spawn,

    // npm packages
    async = require('async'),
    del = require('del'),
    index = require('serve-index'),

    // gulp + plugins
    gulp = require('gulp'),
    serve = require('gulp-serve'),
    tap = require('gulp-tap'),
    browserSync = require('browser-sync'),

    // port to serve reports on
    post = 3333,

    // folder to save reports to
    reportsDir = 'reports';

gulp.task('clean', function (done) {

    del([reportsDir], function (err) {
        if (err) {
            throw err;
        }
        done();
    });

});

gulp.task('test', ['clean'], function (done) {

    var
        // array to store vinyl file objects
        files = [],

        // utility function
        galen = function galen(file, callback) {

            spawn('galen', [
                'test',
                file.path,
                '--htmlreport',
                reportsDir + '/' + file.relative.replace(/\.test/, '')
            ],
            {
                'stdio': 'inherit'
            })
                .on('close', function () {
                    callback();
                });
        };

    gulp.src('./galen-tests/*.test')
        .pipe(tap(function (file) {
            files.push(file);
        }))
        .on('end', function () {
            async.mapSeries(files, function (file, finished) {
                galen(file, finished);
            }, function () {
                done();
            });
        });

});

gulp.task('test-server', ['test'], serve({
    'middleware': function (req, res, next) {
        index(reportsDir, {
            'filter':       false,
            'hidden':       true,
            'icons':        true,
            'stylesheet':   false,
            'template':     false,
            'view':         'details'
        })(req, res, next);
    },
    'port': post,
    'root': reportsDir
}));

gulp.task('localhost', function () {

    browserSync({
        server: {
            baseDir: './website'
        }
    });

});

gulp.task('default', ['localhost']);
