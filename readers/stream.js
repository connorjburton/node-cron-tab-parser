const os = require('os');
const stream = require('stream');

class StreamReader { // would be nice to have TypeScript-like interfaces here
    constructor(streamInput) {
        if (!(streamInput  instanceof stream.Readable)) {
            throw new TypeError('streamInput not instance of stream.Readable in StreamReader#constructor');
        }

        this.streamInput = streamInput;
        this.streamInput.setEncoding('utf8'); // making an assumption on utf8 here, not given too much thought about alternatives here
    }

    toArray() {
        return new Promise((resolve, reject) => {
            let contents = [];

            this.streamInput.on('error', reject);
            this.streamInput.on('data', chunk => contents += chunk);
            // split on the running environments EOL and filter out any empty array values
            this.streamInput.on('end', () => resolve(contents.split(os.EOL).filter(Boolean)));
        });
    }
}

module.exports = StreamReader;
