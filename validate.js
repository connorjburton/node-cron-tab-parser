// [0] dont like the last group, it doesn't take into account all the different characters a path could have
// maybe a better alternative is to let any chars through and if an execute was implemented let it fail then

module.exports = {
    validateDate: date => {
        if (!/^\d\d:\d\d$/.test(date)) {
            console.log('test');
            return false;
        }

        const split = date.split(':');
        return split.length === 2 && parseInt(split[0]) <= 12 && parseInt(split[1]) <= 60;
    },
    validateCron: cron => /^(?>[\d][\d]?|\*) (?>[\d][\d]?|\*) (?>\/[\w\/\\\-_]+)$/.test(cron) // [0]
};
