## CRON

# Specification

We have a set of tasks, each running at least daily, which are scheduled using some simple
values in a text file. You might recognise this if you have written a crontab configuration in the
past.

Examples of the the scheduler config:

`30 1 /bin/run_me_daily`

`45 * /bin/run_me_hourly`

`* * /bin/run_me_every_minute`

`* 19 /bin/run_me_sixty_times`

The first field is the minute past the hour, the second field is the hour of the day and the third is
the command to run. For both cases * means that it should run for all values of that field. In the
above example, run_me_daily has been set to run at 1:30 am every day and run_me_hourly at
45 minutes past the hour every hour. The fields are whitespace-separated and each entry is on
a separate line.

We want you to write a command-line program that takes a single argument. This argument is
the simulated 'current time' in the format HH:MM. The program should accept config lines in the
form above to STDIN and output the soonest time at which each of the commands will fire and
whether it is today or tomorrow. In the case when the task should fire at the simulated 'current
time' then that is the time you should output, not the next one.

For example given the above examples as input and the simulated 'current time' command-line
argument 16:10 the output should be:

`1:30 tomorrow - /bin/run_me_daily`

`16:45 today - /bin/run_me_hourly`

`16:10 today - /bin/run_me_every_minute`

`19:00 today - /bin/run_me_sixty_times`

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
