#!/usr/bin/env node
const readline = require('readline');
const { validateDate, validateCron } = require('./validate.js');
const StdinReader = require('./readers/stdin.js');

class CronTab {
    constructor(date, crons) {
        if (!validateDate(date)) {
            throw new TypeError('Date parameter supplied is not in the format HH:MM')
        }

        if (crons.some(validateCron)) {
            throw new TypeError('Cron configuration supplied is incorrect.')
        }

        this.date = date;
        this.input = crons;
    }
}

const crons = new StdinReader(process.stdin).toArray();

(new CronTab(process.argv[2], crons))();
