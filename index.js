#!/usr/bin/env node
const readline = require('readline');
const StdinReader = require('./readers/stdin.js');
const CronTab = require('./cronTab.js');

new StdinReader().toArray().then(crons => {
    crons.map(cron => {
        const nextExecutionTime = (new CronTab(cron)).getNextExecutionTime(process.argv[2]);
        console.log(nextExecutionTime);
    });
}).catch(console.error);
