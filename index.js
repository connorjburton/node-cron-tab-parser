#!/usr/bin/env node
const StdinReader = require('./readers/stdin.js');
const CronTab = require('./cronTab.js');

new StdinReader().toArray().then(crons => {
    crons.forEach(cron => {
        // don't like hardcoding argv[2], as you can run this with and without the node command, so should really support that
        const nextExecutionTime = (new CronTab(cron)).getNextExecutionTime(process.argv[2]);
        console.log(nextExecutionTime); // could of made this an output class but would have been overkill I think
    });
}).catch(console.error);
