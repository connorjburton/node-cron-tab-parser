const CronTab = require('./../cronTab.js');

describe('CronTab', () => {
    describe('constructor', () => {
        test('non asterix crontab sets properties', () => {
            const cronTab = new CronTab('30 1 /bin/run_me_daily');
            expect(cronTab.cron).toBe('30 1 /bin/run_me_daily');
            expect(cronTab.hours).toBe('1');
            expect(cronTab.minutes).toBe('30');
            expect(cronTab.execute).toBe('/bin/run_me_daily');
        });

        test('1 asterix crontab sets properties', () => {
            const cronTab = new CronTab('45 * /bin/run_me_hourly');
            expect(cronTab.cron).toBe('45 * /bin/run_me_hourly');
            expect(cronTab.hours).toBe('*');
            expect(cronTab.minutes).toBe('45');
            expect(cronTab.execute).toBe('/bin/run_me_hourly');
        });

        test('2 asterix crontab sets properties', () => {
            const cronTab = new CronTab('* * /bin/run_me_every_minute');
            expect(cronTab.cron).toBe('* * /bin/run_me_every_minute');
            expect(cronTab.hours).toBe('*');
            expect(cronTab.minutes).toBe('*');
            expect(cronTab.execute).toBe('/bin/run_me_every_minute');
        });

        test('invalid crontab doesnt set properties', () => {
            const cronTab = new CronTab('feopkapoewd/run_me_every_minute');
            expect(cronTab.cron).toBe('feopkapoewd/run_me_every_minute');
        });
    });

    describe('getNextExecutionMinute', () => {
        test('end of day', () => {
            const cronTab = new CronTab('* * /a/b');
            expect(cronTab.getNextExecutionMinute('23', '59')).toBe('59');
        });

        test('end of day with 10 minutes on crontab', () => {
            const cronTab = new CronTab('10 * /a/b');
            expect(cronTab.getNextExecutionMinute('23', '59')).toBe('10');
        });
 
        test('start of day with 30 1', () => {
            const cronTab = new CronTab('30 1 /a/b');
            expect(cronTab.getNextExecutionMinute('01', '29')).toBe('30');
            expect(cronTab.getNextExecutionMinute('01', '30')).toBe('30');
            expect(cronTab.getNextExecutionMinute('01', '31')).toBe('30');
        });

        test('run next hour with 45 *', () => {
            const cronTab = new CronTab('45 * /a/b');
            expect(cronTab.getNextExecutionMinute('12', '55')).toBe('45');
        });

        test('23:05 with * 23', () => {
            const cronTab = new CronTab('* 23 /a/b');
            expect(cronTab.getNextExecutionMinute('23', '05')).toBe('05');
        });

        test('23:01 with 5 *', () => {
            const cronTab = new CronTab('5 * /a/b');
            expect(cronTab.getNextExecutionMinute('23', '01')).toBe('05');
        });

        test('23:01 with 1 *', () => {
            const cronTab = new CronTab('1 * /a/b');
            expect(cronTab.getNextExecutionMinute('23', '01')).toBe('01');
        });

        test('00:23 with 1 *', () => {
            const cronTab = new CronTab('1 * /a/b');
            expect(cronTab.getNextExecutionMinute('00', '23')).toBe('01');
        });

        test('00:23 with 45 *', () => {
            const cronTab = new CronTab('45 * /a/b');
            expect(cronTab.getNextExecutionMinute('00', '23')).toBe('45');
        });

        test('00:23 with 45 0', () => {
            const cronTab = new CronTab('45 0 /a/b');
            expect(cronTab.getNextExecutionMinute('00', '23')).toBe('45');
        });

        test('00:11 with 1 0', () => {
            const cronTab = new CronTab('1 0 /a/b');
            expect(cronTab.getNextExecutionMinute('00', '11')).toBe('01');
        });

        test('00:11 with 12 0', () => {
            const cronTab = new CronTab('12 0 /a/b');
            expect(cronTab.getNextExecutionMinute('00', '11')).toBe('12');
        });
    });

    describe('getNextExecutionHour', () => {
        test('end of day', () => {
            const cronTab = new CronTab('* * /a/b');
            expect(cronTab.getNextExecutionHour('23')).toBe('23');
            expect(cronTab.getNextExecutionHour('13')).toBe('13');
            expect(cronTab.getNextExecutionHour('02')).toBe('2');
        });

        test('end of day with 10 minutes on crontab', () => {
            const cronTab = new CronTab('10 * /a/b');
            expect(cronTab.getNextExecutionHour('23')).toBe('23');
        });
 
        test('start of day with 30 1', () => {
            const cronTab = new CronTab('30 1 /a/b');
            expect(cronTab.getNextExecutionHour('01')).toBe('1');
        });

        test('run next hour with 45 *', () => {
            const cronTab = new CronTab('45 * /a/b');
            expect(cronTab.getNextExecutionHour('12')).toBe('12');
        });

        test('23:05 with * 23', () => {
            const cronTab = new CronTab('* 23 /a/b');
            expect(cronTab.getNextExecutionHour('23')).toBe('23');
        });

        test('23:01 with 5 *', () => {
            const cronTab = new CronTab('5 * /a/b');
            expect(cronTab.getNextExecutionHour('23')).toBe('23');
        });

        test('23:01 with 1 *', () => {
            const cronTab = new CronTab('1 * /a/b');
            expect(cronTab.getNextExecutionHour('23')).toBe('23');
        });

        test('00:23 with 1 *', () => {
            const cronTab = new CronTab('1 * /a/b');
            expect(cronTab.getNextExecutionHour('00')).toBe('0');
        });

        test('00:23 with 45 *', () => {
            const cronTab = new CronTab('45 * /a/b');
            expect(cronTab.getNextExecutionHour('00')).toBe('0');
        });

        test('00:23 with 45 0', () => {
            const cronTab = new CronTab('45 0 /a/b');
            expect(cronTab.getNextExecutionHour('00')).toBe('0');
        });

        test('00:11 with 1 0', () => {
            const cronTab = new CronTab('1 0 /a/b');
            expect(cronTab.getNextExecutionHour('00')).toBe('0');
        });

        test('00:11 with 12 0', () => {
            const cronTab = new CronTab('12 0 /a/b');
            expect(cronTab.getNextExecutionHour('00')).toBe('0');
        });
    });

    describe('willRunToday', () => {
        test('end of day', () => {
            const cronTab = new CronTab('* * /a/b');
            expect(cronTab.willRunToday('23', '59')).toBe(true);
        });

        test('end of day with 10 minutes on crontab', () => {
            const cronTab = new CronTab('10 * /a/b');
            expect(cronTab.willRunToday('23', '59')).toBe(false);
        });
 
        test('start of day with 30 1', () => {
            const cronTab = new CronTab('30 1 /a/b');
            expect(cronTab.willRunToday('01', '29')).toBe(true);
            expect(cronTab.willRunToday('01', '30')).toBe(true);
            expect(cronTab.willRunToday('01', '31')).toBe(false);
        });

        test('run next hour with 45 *', () => {
            const cronTab = new CronTab('45 * /a/b');
            expect(cronTab.willRunToday('12', '55')).toBe(true);
        });

        test('23:05 with * 23', () => {
            const cronTab = new CronTab('* 23 /a/b');
            expect(cronTab.willRunToday('23', '05')).toBe(true);
        });

        test('23:01 with 5 *', () => {
            const cronTab = new CronTab('5 * /a/b');
            expect(cronTab.willRunToday('23', '01')).toBe(true);
        });

        test('23:01 with 1 *', () => {
            const cronTab = new CronTab('1 * /a/b');
            expect(cronTab.willRunToday('23', '01')).toBe(true);
        });

        test('00:23 with 1 *', () => {
            const cronTab = new CronTab('1 * /a/b');
            expect(cronTab.willRunToday('00', '23')).toBe(true);
        });

        test('00:23 with 45 *', () => {
            const cronTab = new CronTab('45 * /a/b');
            expect(cronTab.willRunToday('00', '23')).toBe(true);
        });

        test('00:23 with 45 0', () => {
            const cronTab = new CronTab('45 0 /a/b');
            expect(cronTab.willRunToday('00', '23')).toBe(true);
        });

        test('00:11 with 1 0', () => {
            const cronTab = new CronTab('1 0 /a/b');
            expect(cronTab.willRunToday('00', '11')).toBe(false);
        });

        test('00:11 with 12 0', () => {
            const cronTab = new CronTab('12 0 /a/b');
            expect(cronTab.willRunToday('00', '11')).toBe(true);
        });
    });

    describe('getNextExecutionTime', () => {
        test('* 19 /bin/run_me_sixty_times', () => {
            const cronTab = new CronTab('* 19 /bin/run_me_sixty_times');
            expect(cronTab.getNextExecutionTime('19:11')).toBe('19:11 today - /bin/run_me_sixty_times');
            expect(cronTab.getNextExecutionTime('18:11')).toBe('19:00 today - /bin/run_me_sixty_times');
            expect(cronTab.getNextExecutionTime('20:00')).toBe('19:00 tomorrow - /bin/run_me_sixty_times');
            expect(cronTab.getNextExecutionTime('01:02')).toBe('19:00 today - /bin/run_me_sixty_times');
        });

        test('5 * /bin/run_me_every_hour_at_five_minutes_past', () => {
            const cronTab = new CronTab('5 * /bin/run_me_every_hour_at_five_minutes_past');
            expect(cronTab.getNextExecutionTime('01:05')).toBe('1:05 today - /bin/run_me_every_hour_at_five_minutes_past');
            expect(cronTab.getNextExecutionTime('18:11')).toBe('19:05 today - /bin/run_me_every_hour_at_five_minutes_past');
            expect(cronTab.getNextExecutionTime('20:00')).toBe('20:05 today - /bin/run_me_every_hour_at_five_minutes_past');
            expect(cronTab.getNextExecutionTime('11:11')).toBe('12:05 today - /bin/run_me_every_hour_at_five_minutes_past');
            expect(cronTab.getNextExecutionTime('23:59')).toBe('0:05 tomorrow - /bin/run_me_every_hour_at_five_minutes_past');
        });

        test('* * /bin/run_every_minute', () => {
            const cronTab = new CronTab('* * /bin/run_every_minute');
            expect(cronTab.getNextExecutionTime('01:05')).toBe('1:05 today - /bin/run_every_minute');
            expect(cronTab.getNextExecutionTime('18:11')).toBe('18:11 today - /bin/run_every_minute');
            expect(cronTab.getNextExecutionTime('20:00')).toBe('20:00 today - /bin/run_every_minute');
            expect(cronTab.getNextExecutionTime('11:11')).toBe('11:11 today - /bin/run_every_minute');
            expect(cronTab.getNextExecutionTime('23:59')).toBe('23:59 today - /bin/run_every_minute');
            expect(cronTab.getNextExecutionTime('00:00')).toBe('0:00 today - /bin/run_every_minute');
        });

        test('23 15 /bin/run_23_of_15', () => {
            const cronTab = new CronTab('23 15 /bin/run_23_of_15');
            expect(cronTab.getNextExecutionTime('01:05')).toBe('15:23 today - /bin/run_23_of_15');
            expect(cronTab.getNextExecutionTime('18:11')).toBe('15:23 tomorrow - /bin/run_23_of_15');
            expect(cronTab.getNextExecutionTime('20:00')).toBe('15:23 tomorrow - /bin/run_23_of_15');
            expect(cronTab.getNextExecutionTime('11:11')).toBe('15:23 today - /bin/run_23_of_15');
            expect(cronTab.getNextExecutionTime('23:59')).toBe('15:23 tomorrow - /bin/run_23_of_15');
        });

        test('00 03 /bin/run_3_minutes_past_midnight', () => {
            const cronTab = new CronTab('03 00 /bin/run_3_minutes_past_midnight');
            expect(cronTab.getNextExecutionTime('00:00')).toBe('0:03 today - /bin/run_3_minutes_past_midnight');
            expect(cronTab.getNextExecutionTime('01:05')).toBe('0:03 tomorrow - /bin/run_3_minutes_past_midnight');
            expect(cronTab.getNextExecutionTime('18:11')).toBe('0:03 tomorrow - /bin/run_3_minutes_past_midnight');
            expect(cronTab.getNextExecutionTime('20:00')).toBe('0:03 tomorrow - /bin/run_3_minutes_past_midnight');
            expect(cronTab.getNextExecutionTime('11:11')).toBe('0:03 tomorrow - /bin/run_3_minutes_past_midnight');
            expect(cronTab.getNextExecutionTime('23:59')).toBe('0:03 tomorrow - /bin/run_3_minutes_past_midnight');
        });
    });
});
