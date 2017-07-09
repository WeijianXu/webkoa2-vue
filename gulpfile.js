const gulp = require('gulp');
// Source map就是一个信息文件，里面储存着位置信息
// 有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
// http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

gulp.task('default', () => {
  return gulp.src('src/**/*.es')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015', 'stage-3'],
      plugins: ['transform-runtime']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'));
})