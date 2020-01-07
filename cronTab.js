const { validateCron, validateTime } = require('./validate.js');
const { ASTERIX, SINGLE_ZERO, DOUBLE_ZEROS, LAST_HOUR } = require('./constants.js');

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

    willRunToday(currentHours, currentMinutes) {
        // if both asterix not matter the time or crontab values it will always run today
        if (this.hours === ASTERIX && this.minutes === ASTERIX) {
            return true;
        }

        const parsedCurrentHours = parseInt(currentHours, 10);
        const parsedCurrentMinutes = parseInt(currentMinutes, 10);
        const parsedMinutes = parseInt(this.minutes, 10);
        const parsedHours = parseInt(this.hours, 10);

        if (this.hours === ASTERIX) {
            // if last hour of day, don't go into next day
            return parsedCurrentMinutes <= parsedMinutes || parsedCurrentHours !== LAST_HOUR;
        }

        if (this.minutes === ASTERIX) {
            return parsedHours >= parsedCurrentHours;
        }

        return parsedHours >= parsedCurrentHours && parsedMinutes >= parsedCurrentMinutes;
    }

    // looking back on this, getNextExecutionHour and getNextExecutionMinute could of been 1 function
    getNextExecutionHour(currentHours, currentMinutes) {
        if (this.hours !== ASTERIX) {
            return String(parseInt(this.hours, 10));
        }

        const parsedCurrentHours = parseInt(currentHours, 10);
        const parsedCurrentMinutes = parseInt(currentMinutes, 10);
        const parsedMinutes = parseInt(this.minutes, 10);

        // if its any hour but we are past the minute in crontab then it'll run next hour
        // otherwise we will run this hour. Also overflow to 00 if we go into the next day
        const newCurrentHours = parsedCurrentMinutes > parsedMinutes ? parsedCurrentHours + 1 : parsedCurrentHours;
        // a little ugly parsing int and casting back to string, but it's to get numbers < 10 consistently formatted
        return newCurrentHours > LAST_HOUR ? SINGLE_ZERO : String(newCurrentHours);
    }

    getNextExecutionMinute(currentHours, currentMinutes) {
        if (this.hours !== ASTERIX && this.minutes === ASTERIX) {
            // if it runs every minute of a specific hour, we are either going to run now if we are in the hour specified,
            // or tomorrow at the start of the hour
            return currentHours === this.hours ? currentMinutes : DOUBLE_ZEROS;
        }

        const leadingZeroMinutes = this.minutes.length === 1 ? `0${this.minutes}` : this.minutes;
        return this.minutes === ASTERIX ? currentMinutes : leadingZeroMinutes;
    }

    getNextExecutionTime(time) {
        if (!this.isValidSyntax()) {
            return `WARNING: ${this.cron} is not a valid crontab`;
        }

        if (!validateTime(time)) {
            return 'WARNING: Date parameter supplied is not in the format HH:MM in CronTab#getNextExecuteTime';
        }

        const [currentHours, currentMinutes] = time.split(':');
        const day = this.willRunToday(currentHours, currentMinutes) ? 'today' : 'tomorrow';

        // if we have * * in crobtab we could get away with just returning the same time, if we had 1 function instead of 2 here that would be easier to do
        return `${this.getNextExecutionHour(currentHours, currentMinutes)}:${this.getNextExecutionMinute(currentHours, currentMinutes)} ${day} - ${this.execute}`;
    }
}

module.exports = CronTab;
