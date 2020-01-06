const { validateTime, validateCron } = require('./../validate.js');

describe('validate', () => {
    test('validateTime', () => {
        expect(validateTime('ffaa')).toBe(false);
        expect(validateTime('11:11')).toBe(true);
        expect(validateTime('23:59')).toBe(true);
        expect(validateTime('01:04')).toBe(true);
        expect(validateTime('01:b4')).toBe(true);
        expect(validateTime('a1:b4')).toBe(true);
    });

    test('validateCron', () => {
        expect(validateCron('* 19 /bin/run_me_sixty_times')).toBe(true);
        expect(validateCron('* * /bin/run_me_every_minute')).toBe(true);
        expect(validateCron('30 1 /bin/run_me_daily')).toBe(true);
        expect(validateCron('45 * /bin/run_me_hourly')).toBe(true);
        expect(validateCron('oijwa 3jipa powakjefpok')).toBe(false);
        expect(validateCron('61 * /bin')).toBe(false);
    });
});
