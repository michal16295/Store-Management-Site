const utils = require('../../../common/utils');

describe('utils.resetTime', () => {
    it('should reset time and return new time', () => {
        const date = new Date('2018-09-11 17:34:11.192');
        const newDate = utils.resetTime(date);
        expect(newDate.getHours()).toBe(10);
        expect(newDate.getMinutes()).toBe(0);
        expect(newDate.getSeconds()).toBe(0);
        expect(newDate.getMilliseconds()).toBe(0);
        expect(newDate.getDate()).toBe(date.getDate());
        expect(newDate.getMonth()).toBe(date.getMonth());
        expect(newDate.getFullYear()).toBe(date.getFullYear());
    });

    it('should reset time of string date and time', () => {
        const date = '2018-09-11 17:34:11.192';
        const newDate = utils.resetTime(date);
        expect(newDate.getHours()).toBe(10);
        expect(newDate.getMinutes()).toBe(0);
        expect(newDate.getSeconds()).toBe(0);
        expect(newDate.getMilliseconds()).toBe(0);
        expect(newDate.getDate()).toBe(11);
        expect(newDate.getMonth()).toBe(8); // 8 because month start from 0
        expect(newDate.getFullYear()).toBe(2018);
    });
});

describe('utils.getSunday', () => {
    it('should return sunday of this week', () => {
        const date = utils.getSunday();
        expect(date.getDay()).toBe(0);
    });
});

describe('utils.getThursday', () => {
    it('should return thursday of this week', () => {
        const date = utils.getThursday();
        expect(date.getDay()).toBe(4);
    });
});