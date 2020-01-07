## CRON

# Prerequisites

Node.js >=0.9.4

# Running

Tested on: Windows 10 Pro 1809, Linux Mint 19.3

Windows: You can't run `node` programs in the style of `./index.js 11:11 < config`, from what I can see. So do `node ./index.js 11:11 < config`

Unix: Set the `index.js` file to executable by running `chmod +x index.js` then run `./index.js 11:11 < config`

# Further Implementation Possibilities

1. Adding an execute method to `CronTab` if you wanted to run it manually, or a method to check if the execute path exists and is executable.
2. More readers, `.csv`, `process.env` etc. Interfaces would be a must at that point, either a crude ES6 roll-your-own or TypeScript.
3. Add outputters, maybe you want to email someone this information, or log it to a file?
4. Add full CronTab support, days/months including named (e.g FRI, JAN)
5. Make outputted times always formatted to HH:MM (challenge instruction dictated single digits hours < 10)

# Notes

1. There was nothing in the spec to dictate what should happen if an invalid `CronTab` is passed, however I didn't think exiting the process is suitable. My opinion is this tool is something a SysAdmin may use to check when a `CronTab` will next run, and I don't think exiting the process because one isn't syntactically correct is helpful.
2. The design was to keep everything as de-coupled as possible. Dependency injection would be an option if we were to add an outputter.
3. There are tests, run `npm install && npm run test`