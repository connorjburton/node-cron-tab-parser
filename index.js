#!/usr/bin/env node
const StreamReader = require('./readers/stream.js');
const CronTab = require('./cronTab.js');

new StreamReader(process.stdin).toArray().then(crons => {
    crons.forEach(cron => {
        // don't like hardcoding argv[2], possibly go through the array and find one that matches the regex in validate:validateTime
        const nextExecutionTime = (new CronTab(cron)).getNextExecutionTime(process.argv[2]);
        console.log(nextExecutionTime); // could of made this an output class but would have been overkill I think
    });
}).catch(console.error);
