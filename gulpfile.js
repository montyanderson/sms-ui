var gulp = require("gulp"),
    less = require("gulp-less"),
    minify = require("gulp-minify-css"),
    streamify = require("gulp-streamify"),
    uglify = require("gulp-uglify");

function logError(err) {
    console.log(err);
    this.emit("end");
}

gulp.task("watch", function() {
    gulp.watch(__dirname + "/assets/*.less", ["styles"]);
    gulp.watch(__dirname + "/assets/*.js", ["scripts"]);
});

gulp.task("styles", function() {
    return gulp.src(__dirname + "/assets/*.less")
        .on("error", logError)
        .pipe(less())
        .pipe(minify())
        .pipe(gulp.dest("public"));
});

gulp.task("scripts", function() {
    return gulp.src(__dirname + "/assets/*.js")
        .on("error", logError)
        .pipe(streamify(uglify()))
        .pipe(gulp.dest("public"));
});

gulp.task("default", ["styles", "scripts"]);
gulp.task("dev", ["default", "watch"]);
