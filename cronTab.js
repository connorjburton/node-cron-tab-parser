const { validateCron, validateTime } = require('./validate.js');

const ASTERIX = '*';
const ZERO_MINS = '00';

class CronTab {
    constructor(cron) {
        this.cron = cron;
        this.hours;
        this.minutes;
        this.execute;
        
        // not too keen on this, but as i don't want to throw an error, i also didn't
        // want to set properties for a cron that isn't valid
        // maybe there could be an error property, which also means we don't have to run isValidSyntax twice
        if (this.isValidSyntax()) {
            this.setProperties(cron);
        }
    }

    setProperties(cron) {
        // would be nice if you could destructure arrays onto class properties but you can't
        const split = cron.split(' ');
        this.minutes = split[0];
        this.hours = split[1];
        this.execute = split[2];
    }

    isValidSyntax() {
        return validateCron(this.cron);
    }

    willRunToday(currentHours) {
        return this.hours === ASTERIX || this.hours >= currentHours;
    }

    getNextExecutionHour(currentHours) {
        return this.hours === ASTERIX ? currentHours : this.hours;
    }

    getNextExecutionMinute(currentMinutes) {
        if (this.hours !== ASTERIX && this.minutes === ASTERIX) {
            return ZERO_MINS;
        }

        return this.minutes === ASTERIX ? currentMinutes : this.minutes;
    }

    getNextExecutionTime(time) {
        if (!this.isValidSyntax()) {
            return `WARNING: ${this.cron} is not a valid crontab`;
        }

        if (!validateTime(process.argv[2])) {
            return 'WARNING: Date parameter supplied is not in the format HH:MM in CronTab#getNextExecuteTime';
        }

        const [currentHours, currentMinutes] = time.split(':');
        const day = this.willRunToday(currentHours) ? 'today' : 'tomorrow';

        return `${this.getNextExecutionHour(currentHours)}:${this.getNextExecutionMinute(currentMinutes)} ${day} - ${this.execute}`;
    }
}

module.exports = CronTab;
