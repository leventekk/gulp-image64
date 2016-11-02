# gulp-image64

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependencies][dep-image]][dep-url]

[npm-url]: https://npmjs.org/package/gulp-image64
[npm-image]: http://img.shields.io/npm/v/gulp-image64.svg

[travis-url]: https://travis-ci.org/leventekk/gulp-image64
[travis-image]: https://travis-ci.org/leventekk/gulp-image64.png

[dep-url]: https://david-dm.org/leventekk/gulp-image64
[dep-image]: http://img.shields.io/david/leventekk/gulp-image64.svg

Convert and replace image-files within your DOM/HTML to base64-encoded data.

## Example

##### gulpfile.js

```js
var gulp = require('gulp');
var image64 = require('gulp-image64');

//cheerio load options
var options = {
	lowerCaseAttributeNames: false
};

gulp.task('default', function () {
	gulp.src('index.html')
		.pipe(image64(options))
		.pipe(gulp.dest('path'));
});
```

##### index.html // Before...

```js
<html>
	<head>
	</head>
	<body>
		<img src="sample.png" />
...
```


##### path/index.html // ...after:

```html
<html>
	<head>
	</head>
	<body>
		<img src="data:image/png;base64,...">

...
```

This plugin uses [cheerio](https://github.com/cheeriojs/cheerio) so any options passed in `image64(options)` function call will be passed into `cheerio.load` function. See [here](https://github.com/cheeriojs/cheerio#loading) for complete list of options.