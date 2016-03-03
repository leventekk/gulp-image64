'use strict';

const assert = require('assert');
const gutil = require('gulp-util');
const image64 = require('../index');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

describe('gulp-image64', () => {
    describe('in buffer mode', () => {
        const inputFilename = path.join(__dirname, '/fixtures/input.html');
        const outputFilename = path.join(__dirname, '/fixtures/output.html');

        it('should replace images in DOM with base64 data', done => {
            const stream = image64();
            const input = new gutil.File({
                base: path.dirname(inputFilename),
                path: inputFilename,
                contents: new Buffer(fs.readFileSync(inputFilename, 'utf8'))
            });

            stream.on('data', newFile => {
                assert.equal(String(newFile.contents), fs.readFileSync(outputFilename, 'utf8'));
                done();
            });

            stream.write(input);
        });

        it('should skip images with base64 data', done => {
            const stream = image64();
            const input = new gutil.File({
                base: path.dirname(outputFilename),
                path: outputFilename,
                contents: new Buffer(fs.readFileSync(outputFilename, 'utf8'))
            });

            stream.on('data', newFile => {
                assert.equal(String(newFile.contents), fs.readFileSync(outputFilename, 'utf8'));
                done();
            });

            stream.write(input);
        });
    });
});