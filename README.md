## CRON

# Specification

Examples of the the scheduler config:

`30 1 /bin/run_me_daily`

`45 * /bin/run_me_hourly`

`* * /bin/run_me_every_minute`

`* 19 /bin/run_me_sixty_times`

Given the above examples as input and the simulated 'current time' command-line argument 16:10 the output should be:

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
