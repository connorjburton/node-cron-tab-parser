const StreamReader = require('./../../readers/stream.js')

describe('StreamReader', () => {
    test('StreamReader throws error if not passed stream.Readable', () => {
        expect(() => new StreamReader('test')).toThrowError(new TypeError('streamInput not instance of stream.Readable in StreamReader#constructor'));
    });
});
