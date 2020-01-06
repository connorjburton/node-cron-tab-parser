const os = require('os');
const stream = require('stream');

class StdinReader { // would be nice to have TypeScript-like interfaces here
    constructor() {
        if (!(process.stdin instanceof stream.Readable)) { // unsure if process.stdin can be anything but stream.Readable but added this just in-case
            throw new TypeError('stdin not instance of stream.Readable in StdinReader#constructor');
        }

        this.stdin = process.stdin;
        this.stdin.setEncoding('utf8');
    }

    toArray() {
        return new Promise((resolve, reject) => {
            let contents = [];

            this.stdin.on('error', reject);
            this.stdin.on('data', chunk => contents += chunk);
            this.stdin.on('end', () => resolve(contents.split(os.EOL)));
        });
    }
}

module.exports = StdinReader;
