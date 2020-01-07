const os = require('os');
const { PassThrough, Readable } = require('stream');

const StreamReader = require('./../../readers/stream.js');

const mockStream = () => Readable.from([`a${os.EOL}b${os.EOL}c`]);

describe('StreamReader', () => {
    test('StreamReader throws error if not passed stream.Readable', () => {
        expect(() => new StreamReader('test')).toThrowError(new TypeError('streamInput not instance of stream.Readable in StreamReader#constructor'));
    });

    test('StreamReader sets streamInput encoding to utf8', () => {
        const mockedStreamReader = new StreamReader(new PassThrough);
        expect(mockedStreamReader.streamInput.readableEncoding).toBe('utf8');
    });

    test('StreamReader gets correct array from stream', () => {
        const mockStreamInstance = mockStream();
        const mockedStreamReader = new StreamReader(mockStreamInstance);
        expect(mockedStreamReader.toArray()).resolves.toStrictEqual(['a', 'b', 'c']);
    });
});
