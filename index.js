'use strict';

const gutil = require('gulp-util');
const through = require('through2');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

module.exports = (options) => {

    // create a stream through which each file will pass
    return through.obj((file, enc, callback) => {

        if (file.isNull()) {
            this.push(file);
            // do nothing if no contents
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-image64', 'Streaming not supported'));
            return callback();
        }

        if (file.isBuffer()) {
            const $ = cheerio.load(String(file.contents), options);

            $('img').each((index, element) => {
                const $el = $(element);
                const sourceSrc = $el.attr('src');

                if (sourceSrc) {
                    const isBase64Already = sourceSrc.indexOf('data');

                    if (sourceSrc !== '' && typeof sourceSrc !== 'undefined' && isBase64Already !== 0) {
                        let basePath = file.base;

                        if (file.history.length) {
                          const historyPath = file.history[0].split('/');

                          historyPath.pop();

                          basePath = historyPath.join('/');
                        }

                        const sourcePath = path.join(basePath, sourceSrc);
                        const mimetype = mime.lookup(sourcePath);

                        if (mimetype !== 'application/octet-stream') {
                            const sfile = fs.readFileSync(sourcePath);
                            const simg64 = new Buffer(sfile).toString('base64');

                            $el.attr('src', `data:${mimetype};base64,${simg64}`);
                        }
                    }
                }
            });

            const output = $.html();

            file.contents = new Buffer(output);

            return callback(null, file);
        }
    });
};
