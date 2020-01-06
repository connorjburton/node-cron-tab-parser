const stream = require('stream');

class StdinReader {
    constructor(stdin) {
        if (stdin instanceof stream.Readable) {
            console.log('test');
        }

        console.log('test2', stdin, stdin.constructor);
    }

    parseReadStream() {

    }

    toArray() {

    }
}

module.exports = StdinReader;
