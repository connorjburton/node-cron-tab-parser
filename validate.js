const { ASTERIX } = require('./constants.js');

module.exports = {
    validateTime: date => {
        if (!/^\d\d:\d\d$/.test(date)) {
            return false;
        }

        const [hours, minutes] = date.split(':');
        return parseInt(hours) <= 23 && parseInt(minutes) <= 59;
    },
    validateCron: cron => {
        // dont like the last group, it doesn't take into account all the different characters a path could have
        // maybe a better alternative is to let any chars through and if an execute was implemented let it fail then
        if (!/^([\d][\d]?|\*) ([\d][\d]?|\*) (\/[\w\/\\\-_]+)$/.test(cron)) {
            return false;
        }

        const [minutes, hours] = cron.split(' ');
        return minutes === ASTERIX || parseInt(minutes) <= 59 && hours === ASTERIX || parseInt(hours) <= 23;
    }
};
