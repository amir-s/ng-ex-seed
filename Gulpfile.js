var gulp = require('gulp'),
	concat = require('gulp-concat')


gulp.task('prepare', function() {
	gulp.src('node_modules/angular/**/*').pipe(gulp.dest('public/lib/angular'));
	gulp.src('node_modules/bootstrap/dist/**/*').pipe(gulp.dest('public/lib/bootstrap'));
	gulp.src('node_modules/angular-ui-router/build/**/*').pipe(gulp.dest('public/lib/angular-ui-router'));
});


gulp.task('combine', function() {
	gulp.src([
		'public/lib/angular/angular.min.js',
		'public/lib/angular-ui-router/angular-ui-router.min.js',
		'public/lib/bootstrap/bootstrap.min.js'
	])
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest('public/'));
});

gulp.task('minify', function() {
	gulp.src([
			'app/*.js',
			'app/services/*.js',
			'app/factories/*.js',
			'app/filters/*.js',
			'app/directives/*.js',
			'app/controllers/*.js',
			'app/configs/*.js'
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('public/'));
});


gulp.task('watch', ['minify', 'combine'], function() {
	gulp.watch([
		'app/**/*.js',
		'app/*.js'
	],[
		'minify'
	]);
});


gulp.task('default', ['prepare', 'watch']);
