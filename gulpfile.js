const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task ('styles', function(done) {                                        
    return gulp.src('./public/styles/*.css')    

    .pipe(concat('styles.css')) 
    .pipe(gulp.dest('./public/dist/'))
    done();
}   );