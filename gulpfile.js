const gulp = require('gulp');
// Source map就是一个信息文件，里面储存着位置信息
// 有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
// http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const copy = require('gulp-copy');

gulp.task('build', () => {
  return gulp.src('src/**/*.es')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015', 'stage-3'],
      plugins: ['transform-runtime']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'));
})

gulp.task('copy', () => {
  // 设置copy插件的路径为 './build/' ，同时设置prefix为1，从而避免源文件拷贝时被清空
  return gulp.src('src/**/*.json')
    .pipe(copy('./build/', {
      prefix: 1
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['copy', 'build']);