const uglify = require("gulp-uglify-es").default;
const { src, dest } = require("gulp");
const gulp = require("gulp");
// mimificar codigo

const minify = (done) => {
    src("./cache/src/**/*.js").pipe(uglify()).pipe(dest("./dist"));
    done();
};
gulp.task("minify",minify);
